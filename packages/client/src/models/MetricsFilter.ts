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

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface MetricsFilter
 */
export interface MetricsFilter {
    /**
     * 
     * @type {Date}
     * @memberof MetricsFilter
     */
    end: Date;
    /**
     * 
     * @type {number}
     * @memberof MetricsFilter
     */
    points: number;
    /**
     * 
     * @type {Date}
     * @memberof MetricsFilter
     */
    start: Date;
}

/**
 * Check if a given object implements the MetricsFilter interface.
 */
export function instanceOfMetricsFilter(value: object): value is MetricsFilter {
    if (!('end' in value) || value['end'] === undefined) return false;
    if (!('points' in value) || value['points'] === undefined) return false;
    if (!('start' in value) || value['start'] === undefined) return false;
    return true;
}

export function MetricsFilterFromJSON(json: any): MetricsFilter {
    return MetricsFilterFromJSONTyped(json, false);
}

export function MetricsFilterFromJSONTyped(json: any, ignoreDiscriminator: boolean): MetricsFilter {
    if (json == null) {
        return json;
    }
    return {
        
        'end': (new Date(json['end'])),
        'points': json['points'],
        'start': (new Date(json['start'])),
    };
}

export function MetricsFilterToJSON(json: any): MetricsFilter {
    return MetricsFilterToJSONTyped(json, false);
}

export function MetricsFilterToJSONTyped(value?: MetricsFilter | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'end': ((value['end']).toISOString()),
        'points': value['points'],
        'start': ((value['start']).toISOString()),
    };
}

