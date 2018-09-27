import { request } from '../libs/RestApi';
import { ACCESS_TOKEN } from '../libs/Config';
import {
    HTTP_METHOD_GET,
    HTTP_METHOD_POST
} from '../libs/Config';

export function login(loginRequest) {
    return request({
        url: 'signin',
        method: HTTP_METHOD_POST,
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: "signup",
        method: HTTP_METHOD_POST,
        body: JSON.stringify(signupRequest)
    });
}

export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: "users/me",
        method: HTTP_METHOD_GET
    });
}

export function getUserProfile() {
    return request({
        url: "users/myprofile",
        method: HTTP_METHOD_GET
    });
}

export function checkUserAvailability(key, value) {
    return request({
        url: "users/availability?key=" + key + "&value=" + value,
        method: HTTP_METHOD_GET
    });
}