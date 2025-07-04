/* tslint:disable */
/* eslint-disable */
/**
 * ISOK API
 * Openapi of isok api
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * 
 * @export
 */
export const ApiCheckStatus = {
    None: 'None',
    Reachable: 'Reachable',
    Unreachable: 'Unreachable',
    ReachableUnreachable: 'ReachableUnreachable'
} as const;
export type ApiCheckStatus = typeof ApiCheckStatus[keyof typeof ApiCheckStatus];


export function instanceOfApiCheckStatus(value: any): boolean {
    for (const key in ApiCheckStatus) {
        if (Object.prototype.hasOwnProperty.call(ApiCheckStatus, key)) {
            if (ApiCheckStatus[key as keyof typeof ApiCheckStatus] === value) {
                return true;
            }
        }
    }
    return false;
}

export function ApiCheckStatusFromJSON(json: any): ApiCheckStatus {
    return ApiCheckStatusFromJSONTyped(json, false);
}

export function ApiCheckStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiCheckStatus {
    return json as ApiCheckStatus;
}

export function ApiCheckStatusToJSON(value?: ApiCheckStatus | null): any {
    return value as any;
}

export function ApiCheckStatusToJSONTyped(value: any, ignoreDiscriminator: boolean): ApiCheckStatus {
    return value as ApiCheckStatus;
}

