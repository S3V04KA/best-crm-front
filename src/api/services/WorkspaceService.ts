/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateWorkspaceDto } from '../models/CreateWorkspaceDto';
import type { ResponseFullWorkspaceDto } from '../models/ResponseFullWorkspaceDto';
import type { ResponseWorkspaceDto } from '../models/ResponseWorkspaceDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WorkspaceService {
    /**
     * @returns ResponseWorkspaceDto
     * @throws ApiError
     */
    public static workspaceControllerListAll(): CancelablePromise<Array<ResponseWorkspaceDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/workspaces',
        });
    }
    /**
     * @param requestBody
     * @returns ResponseFullWorkspaceDto
     * @throws ApiError
     */
    public static workspaceControllerCreate(
        requestBody: CreateWorkspaceDto,
    ): CancelablePromise<ResponseFullWorkspaceDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/workspaces',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns ResponseWorkspaceDto
     * @throws ApiError
     */
    public static workspaceControllerListMine(): CancelablePromise<Array<ResponseWorkspaceDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/workspaces/me',
        });
    }
    /**
     * @param workspaceId
     * @returns ResponseWorkspaceDto
     * @throws ApiError
     */
    public static workspaceControllerGetWorkspace(
        workspaceId: string,
    ): CancelablePromise<ResponseWorkspaceDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/workspaces/{workspaceId}',
            path: {
                'workspaceId': workspaceId,
            },
        });
    }
    /**
     * @param workspaceId
     * @returns ResponseWorkspaceDto
     * @throws ApiError
     */
    public static workspaceControllerGetWorkspaceUsers(
        workspaceId: string,
    ): CancelablePromise<ResponseWorkspaceDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/workspaces/{workspaceId}/users',
            path: {
                'workspaceId': workspaceId,
            },
        });
    }
    /**
     * @param workspaceId
     * @param userId
     * @returns any
     * @throws ApiError
     */
    public static workspaceControllerAddUser(
        workspaceId: string,
        userId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/workspaces/{workspaceId}/user/{userId}',
            path: {
                'workspaceId': workspaceId,
                'userId': userId,
            },
        });
    }
    /**
     * @param workspaceId
     * @param formData
     * @returns any
     * @throws ApiError
     */
    public static workspaceControllerUpdatePs(
        workspaceId: string,
        formData: {
            text?: string;
            html?: string;
            file?: Blob;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/workspaces/{workspaceId}/ps',
            path: {
                'workspaceId': workspaceId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static workspaceControllerDelete(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/workspaces/{id}',
            path: {
                'id': id,
            },
        });
    }
}
