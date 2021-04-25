// response.ts

import {AxiosResponse, AxiosError} from 'axios';

export function handleResponse(response: AxiosResponse): any {
    if (response.data) {
        return response.data;
    }

    return response;
}

export function handleError(error: Error | AxiosError): any {
    return error;
}