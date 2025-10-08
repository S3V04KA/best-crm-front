/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateLeadDto } from '../models/CreateLeadDto';
import type { LeadResponseDto } from '../models/LeadResponseDto';
import type { SendProposalDto } from '../models/SendProposalDto';
import type { UpdateLeadDto } from '../models/UpdateLeadDto';
import type { UpdateStatusDto } from '../models/UpdateStatusDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LeadsService {
    /**
     * Create lead
     * @param workspaceId ID of the workspace
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static leadsWorkspaceControllerCreate(
        workspaceId: any,
        requestBody: CreateLeadDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/leads/{workspaceId}',
            path: {
                'workspaceId': workspaceId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param workspaceId ID of the workspace
     * @returns LeadResponseDto List of leads
     * @throws ApiError
     */
    public static leadsWorkspaceControllerFindAllFromWorkspace(
        workspaceId: any,
    ): CancelablePromise<Array<LeadResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/leads/{workspaceId}',
            path: {
                'workspaceId': workspaceId,
            },
        });
    }
    /**
     * @param workspaceId ID of the workspace
     * @returns LeadResponseDto
     * @throws ApiError
     */
    public static leadsWorkspaceControllerFindAllMineFromWorkspace(
        workspaceId: any,
    ): CancelablePromise<Array<LeadResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/leads/{workspaceId}/me',
            path: {
                'workspaceId': workspaceId,
            },
        });
    }
    /**
     * @param id
     * @param workspaceId ID of the workspace
     * @returns LeadResponseDto Lead by id
     * @throws ApiError
     */
    public static leadsWorkspaceControllerFindOne(
        id: string,
        workspaceId: any,
    ): CancelablePromise<LeadResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/leads/{workspaceId}/{id}',
            path: {
                'id': id,
                'workspaceId': workspaceId,
            },
        });
    }
    /**
     * Update lead
     * @param id
     * @param workspaceId ID of the workspace
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static leadsWorkspaceControllerUpdate(
        id: string,
        workspaceId: any,
        requestBody: UpdateLeadDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/leads/{workspaceId}/{id}',
            path: {
                'id': id,
                'workspaceId': workspaceId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @param workspaceId ID of the workspace
     * @returns any Deletion result
     * @throws ApiError
     */
    public static leadsWorkspaceControllerRemove(
        id: string,
        workspaceId: any,
    ): CancelablePromise<{
        success?: boolean;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/leads/{workspaceId}/{id}',
            path: {
                'id': id,
                'workspaceId': workspaceId,
            },
        });
    }
    /**
     * @param id
     * @param workspaceId ID of the workspace
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static leadsWorkspaceControllerChangeStatus(
        id: string,
        workspaceId: any,
        requestBody: UpdateStatusDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/leads/{workspaceId}/{id}/status',
            path: {
                'id': id,
                'workspaceId': workspaceId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Send cooperation proposal via SMTP
     * @param id
     * @param workspaceId ID of the workspace
     * @param requestBody
     * @returns any Result
     * @throws ApiError
     */
    public static leadsWorkspaceControllerSendProposal(
        id: string,
        workspaceId: any,
        requestBody: SendProposalDto,
    ): CancelablePromise<{
        messageId?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/leads/{workspaceId}/{id}/proposal',
            path: {
                'id': id,
                'workspaceId': workspaceId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns LeadResponseDto List of leads
     * @throws ApiError
     */
    public static leadsControllerGetAllLeads(): CancelablePromise<Array<LeadResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/leads',
        });
    }
}
