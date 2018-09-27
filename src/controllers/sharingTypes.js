import { request } from '../libs/RestApi';
import {
    HTTP_METHOD_GET,
    HTTP_METHOD_POST,
    HTTP_METHOD_PUT,
    HTTP_METHOD_PATCH,
    HTTP_METHOD_DELETE
} from '../libs/Config';

const ENDPOINT = 'sharing-types';

export function getAllSharingType() {
    return request({
        url: ENDPOINT,
        method: HTTP_METHOD_GET
    });
}

export function updateSharingTypeById(id, body) {
    return request({
        url: ENDPOINT + '/' + id,
        method: HTTP_METHOD_PUT,
        body: JSON.stringify(body)
    });
}

export function createSharingType(body) {
    return request({
        url: ENDPOINT,
        method: HTTP_METHOD_POST,
        body: JSON.stringify(body)
    });
}

export function deleteSharingTypeById(id) {
    return request({
        url: ENDPOINT + '/' + id,
        method: HTTP_METHOD_DELETE
    });
}