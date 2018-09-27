import { request } from '../libs/RestApi';
import {
    HTTP_METHOD_GET,
    HTTP_METHOD_POST,
    HTTP_METHOD_PUT,
    HTTP_METHOD_DELETE,
} from '../libs/Config';

const ENDPOINT = 'sharing-levels';

export function getAllSharingLevel() {
    return request({
        url: ENDPOINT,
        method: HTTP_METHOD_GET,
    });
}

export function updateSharingLevelById(id, body) {
    return request({
        url: `${ENDPOINT}/${id}`,
        method: HTTP_METHOD_PUT,
        body: JSON.stringify(body),
    });
}

export function createSharingLevel(body) {
    return request({
        url: ENDPOINT,
        method: HTTP_METHOD_POST,
        body: JSON.stringify(body),
    });
}

export function deleteSharingLevelById(id) {
    return request({
        url: `${ENDPOINT}/${id}`,
        method: HTTP_METHOD_DELETE,
    });
}
