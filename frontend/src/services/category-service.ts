import axios from 'axios-observable';
import { Deserialize, DeserializeArray, IJsonArray, IJsonObject } from 'dcerialize';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Category } from '../models/category';
import { CRUDL } from './crudl';


export class CategoryService implements CRUDL {
    // Base URL
    baseUrl = '/categories'

    /**
     * Returns a list of all the categories
     */
    list(): Observable<Category[]> {
        return axios.get<IJsonArray>(this.baseUrl)
            .pipe(
                map(result => DeserializeArray(result.data, () => Category)),
                catchError(err => of(err))
            );
    }

    /**
     * Get a resource by ID
     */
    get(id: number): Observable<Category> {
        return axios.get<IJsonObject>(`${this.baseUrl}/${id}`)
            .pipe(
                map(result => Deserialize(result.data, () => Category)),
                catchError(err => of(err))
            );
    }

    /**
     * Add a new Category
     */
    post(data: Category): Observable<Category> {
        return axios.post<IJsonObject>(this.baseUrl, data)
            .pipe(
                map(result => Deserialize(result.data, () => Category)),
                catchError(err => of(err))
            );
    }

    /**
     * Update a resource
     */
    update(data: Category): Observable<Category> {
        return axios.put<IJsonObject>(`${this.baseUrl}/${data.id}`, data)
            .pipe(
                map(result => Deserialize(result.data, () => Category)),
                catchError(err => of(err))
            );
    }

    /**
     * Delete an Category by ID
     */
    delete(id: number): Observable<null> {
        return axios.delete<null>(`${this.baseUrl}/${id}`)
        .pipe(
            catchError(err => of(err))
        )
    }
}   