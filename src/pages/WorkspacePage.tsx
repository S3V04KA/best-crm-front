import { WorkspaceService } from "@/api";
import { Button, Card, CardContent, CardHeader, Input } from "@/components/ui";
import { CodeTextbox } from "@/components/ui/CodeBox";
import { PDFUploadButton } from "@/components/ui/PDFUploadButton";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export interface Workspace {
  id?: string;
  name?: string;
  html?: string;
  text?: string;
  file: File | null;
}

export const WorkspacePage: React.FC = () => {
  const workspaceId = useParams().workspaceId;
  const [workspace, setWorkspace] = useState<Partial<Workspace>>();

  const loadWorkspace = async () => {
    try {
      const data = await WorkspaceService.workspaceControllerGetWorkspace(
        workspaceId || ""
      );
      setWorkspace(data);
    } catch (e) {
      console.log(e);
    }
  };

  const onSave = async () => {
    try {
      if (!workspace?.file) return;
      await WorkspaceService.workspaceControllerUpdatePs(workspaceId || "", {
        html: workspace.html,
        text: workspace.text,
        file: workspace.file,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadWorkspace();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>Редактирование группы</CardHeader>
        <CardContent className="w-[50%] space-y-3 py-2">
          <Input label="Название" value={workspace?.name} />
          <CodeTextbox
            label="HTML (Опционально)"
            value={workspace?.html}
            onChange={(e) => {
              setWorkspace({ ...workspace, html: e.target.value });
            }}
          />
          <CodeTextbox
            label="Текст"
            value={workspace?.text}
            onChange={(e) => {
              setWorkspace({ ...workspace, text: e.target.value });
            }}
          />
          <div>
            <PDFUploadButton
              onFileSelect={(file) => {
                setWorkspace({ ...workspace, file });
              }}
            />
          </div>
          <Button variant="primary" onClick={onSave}>
            Сохранить
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
