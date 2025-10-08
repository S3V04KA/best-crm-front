/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateLeadDto = {
    email: string | null;
    phoneNumber: string | null;
    site: string | null;
    name: string | null;
    comment: string | null;
    companyTypeId: string;
    responsibleId: string | null;
    status: UpdateLeadDto.status | null;
    callType: UpdateLeadDto.callType | null;
};
export namespace UpdateLeadDto {
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

