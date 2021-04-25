// provider.ts

import {handleResponse, handleError} from './response'; 
import axios from 'axios';

// API URL
const BASE_URL = '/api';

/**
 * List all resources from a type
 * @param {string} resource Resource type
 */
const list = (resource: string) => {
    return axios
        .get(`${BASE_URL}/${resource}`)
        .then(handleResponse)
        .catch(handleError);
}

/**
 * Get a resource by ID
 * @param {string} resource Resource type
 * @param {number} id Id of the resource to get
 */
const get = (resource: string, id: number) => {
    return axios
        .get(`${BASE_URL}/${resource}/${id}`)
        .then(handleResponse)
        .catch(handleError);
}

/**
 * Post a new resource
 * @param {string} resource Resource type
 * @param {any} model New model to post
 */
const post = (resource: string, model: any) => {
    return axios
        .post(`${BASE_URL}/${resource}`, model)
        .then(handleResponse)
        .catch(handleError);
}

/**
 * Update an existing resource
 * @param {string} resource Resource type
 * @param {any} model Model with updated data
 */
const update = (resource: string, model: any) => {
    return axios
        .put(`${BASE_URL}/${resource}/${model.id}`, model)
        .then(handleResponse)
        .catch(handleError);
}

/**
 * Partially update an existing resource
 * @param {string} resource Resource type
 * @param {any} model Model with updated data
 */
 const partialUpdate = (resource: string, model: any) => {
    return axios
        .patch(`${BASE_URL}/${resource}/${model.id}`, model)
        .then(handleResponse)
        .catch(handleError);
}

/**
 * Remove a resource by ID
 * @param {string} resource Resource type
 * @param {number} id Id of the resource to get
 */
const remove = (resource: string, id: number) => {
    return axios
        .delete(`${BASE_URL}/${resource}/${id}`)
        .then(handleResponse)
        .catch(handleError);
}

export const apiProvider = {
    list,
    get,
    post,
    update,
    partialUpdate,
    remove,
}