/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PermissionsResponseDto } from '../models/PermissionsResponseDto';
import type { SetUserRoleDto } from '../models/SetUserRoleDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AccessControlService {
    /**
     * List all permissions
     * @returns PermissionsResponseDto
     * @throws ApiError
     */
    public static aclControllerListAll(): CancelablePromise<PermissionsResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/acl/permissions',
        });
    }
    /**
     * List current user permissions (role + overrides)
     * @returns PermissionsResponseDto
     * @throws ApiError
     */
    public static aclControllerListMine(): CancelablePromise<PermissionsResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/acl/me/permissions',
        });
    }
    /**
     * List roles
     * @returns any
     * @throws ApiError
     */
    public static aclControllerListRoles(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/acl/roles',
        });
    }
    /**
     * Create role
     * @returns any
     * @throws ApiError
     */
    public static aclControllerCreateRole(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/acl/roles',
        });
    }
    /**
     * Update role
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static aclControllerUpdateRole(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/acl/roles/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Set role permissions by codes
     * @param id
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static aclControllerSetRolePerms(
        id: string,
        requestBody: {
            permissionCodes: Array<string>;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/acl/roles/{id}/permissions',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Set user permission overrides
     * @param id
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static aclControllerSetUserOverrides(
        id: string,
        requestBody: {
            overrides: Array<{
                code?: string;
                allowed?: boolean;
            }>;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/acl/users/{id}/overrides',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param userId
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static aclControllerSetUserRole(
        userId: string,
        requestBody: SetUserRoleDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/acl/users/{userId}/role',
            path: {
                'userId': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
