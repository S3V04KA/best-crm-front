/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserDto } from './UserDto';
export type LeadResponseDto = {
    id: string;
    email: string;
    phoneNumber?: string;
    site?: string;
    name?: string;
    comment?: string;
    status?: LeadResponseDto.status;
    callType?: LeadResponseDto.callType;
    companyType?: Record<string, any> | null;
    responsible: UserDto | null;
    createdAt: string;
    updatedAt: string;
};
export namespace LeadResponseDto {
    export enum status {
        '_0' = 0,
        '_1' = 1,
        '_2' = 2,
        '_3' = 3,
    }
    export enum callType {
        '_0' = 0,
        '_1' = 1,
        '_2' = 2,
        '_3' = 3,
    }
}

