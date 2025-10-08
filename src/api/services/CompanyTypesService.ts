/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CompanyTypesService {
    /**
     * Create company type
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static companyTypeControllerCreate(
        requestBody: {
            code: string;
            name: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/company-types',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any List of company types
     * @throws ApiError
     */
    public static companyTypeControllerFindAll(): CancelablePromise<Array<{
        id?: string;
        code?: string;
        name?: string;
        createdAt?: string;
        updatedAt?: string;
    }>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/company-types',
        });
    }
    /**
     * @param id
     * @returns any Company type by id
     * @throws ApiError
     */
    public static companyTypeControllerFindOne(
        id: string,
    ): CancelablePromise<{
        id?: string;
        code?: string;
        name?: string;
        createdAt?: string;
        updatedAt?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/company-types/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update company type
     * @param id
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static companyTypeControllerUpdate(
        id: string,
        requestBody: {
            code?: string;
            name?: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/company-types/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns any Deletion result
     * @throws ApiError
     */
    public static companyTypeControllerRemove(
        id: string,
    ): CancelablePromise<{
        success?: boolean;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/company-types/{id}',
            path: {
                'id': id,
            },
        });
    }
}
