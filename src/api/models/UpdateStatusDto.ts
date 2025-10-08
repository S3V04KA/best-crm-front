/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateStatusDto = {
    email: string | null;
    phoneNumber: string | null;
    comment: string | null;
    site: string | null;
    status: UpdateStatusDto.status | null;
    callType: UpdateStatusDto.callType | null;
};
export namespace UpdateStatusDto {
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

