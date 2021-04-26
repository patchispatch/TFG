// provider.ts

import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import axios from 'axios-observable';


// TODO: configure this in .env or similar
// API URL
const BASE_URL = '';

/**
 * List all resources from a type
 * @param {string} resource Resource type
 */
function list<T>(resource: string): Observable<T> {
    return axios.get<T>(`${BASE_URL}/${resource}`)
        .pipe(
            map(result => result.data),
            catchError(err => of(err))
        );
}

/**
 * Get a resource by ID
 * @param {string} resource Resource type
 * @param {number} id Id of the resource to get
 */
function get<T>(resource: string, id: number): Observable<T> {
    return axios
        .get(`${BASE_URL}/${resource}/${id}`)
        .pipe(
            map(result => result.data),
            catchError(err => of(err))
        );
}

/**
 * Post a new resource
 * @param {string} resource Resource type
 * @param {any} model New model to post
 */
function post<T>(resource: string, model: T): Observable<T> {
    return axios
        .post(`${BASE_URL}/${resource}`, model)
        .pipe(
            map(result => result.data),
            catchError(err => of(err))
        );
}

/**
 * Update an existing resource
 * @param {string} resource Resource type
 * @param {any} model Model with updated data
 */
function update<T>(resource: string, model: any): Observable<T> {
    return axios
        .put(`${BASE_URL}/${resource}/${model.id}`, model)
        .pipe(
            map(result => result.data),
            catchError(err => of(err))
        );
}

/**
 * Partially update an existing resource
 * @param {string} resource Resource type
 * @param {any} model Model with updated data
 */
function partialUpdate<T>(resource: string, model: any): Observable<T> {
    return axios
        .patch(`${BASE_URL}/${resource}/${model.id}`, model)
        .pipe(
            map(result => result.data),
            catchError(err => of(err))
        );
}

/**
 * Remove a resource by ID
 * @param {string} resource Resource type
 * @param {number} id Id of the resource to get
 */
function remove(resource: string, id: number): Observable<null> {
    return axios
        .delete(`${BASE_URL}/${resource}/${id}`)
        .pipe(
            catchError(err => of(err))
        );
}

export const apiProvider = {
    list,
    get,
    post,
    update,
    partialUpdate,
    remove,
}