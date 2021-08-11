import axios from 'axios-observable';
import { Deserialize, DeserializeArray, IJsonArray, IJsonObject, Serialize } from 'dcerialize';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Category } from '../models/category';
import { CRUDL } from './crudl';
import snackbar from 'src/SnackbarUtils';


export class CategoryService implements CRUDL {
  // Base URL
  baseUrl = '/categories/'

  /**
   * Returns a list of all the categories
   */
  list(): Observable<Category[]> {
    return axios.get<IJsonArray>(this.baseUrl)
      .pipe(
        map(result => DeserializeArray(result.data, () => Category)),
        catchError(err => {
          snackbar.error("Error retrieving category list");
          return throwError(err);
        }),
      );
  }

  /**
   * Get a resource by ID
   */
  get(id: number): Observable<Category> {
    return axios.get<IJsonObject>(`${this.baseUrl}${id}`)
      .pipe(
        map(result => Deserialize(result.data, () => Category)),
        catchError(err => {
          snackbar.error("Error retrieving category");
          return throwError(err);
        }),
      );
  }

  /**
   * Add a new Category
   */
  post(data: Category): Observable<Category> {
    return axios.post<IJsonObject>(this.baseUrl, Serialize(data, () => Category))
      .pipe(
        map(result => Deserialize(result.data, () => Category)),
        catchError(err => {
          snackbar.error("Error creating category");
          return throwError(err);
        }),
      );
  }

  /**
   * Update a resource
   */
  update(data: Category): Observable<Category> {
    return axios.put<IJsonObject>(`${this.baseUrl}${data.id}`, data)
      .pipe(
        map(result => Deserialize(result.data, () => Category)),
        catchError(err => {
          snackbar.error("Error updating category");
          return throwError(err);
        }),
      );
  }

  /**
   * Delete an Category by ID
   */
  delete(id: number): Observable<any> {
    return axios.delete<null>(`${this.baseUrl}${id}`)
    .pipe(
      catchError(err => {
        snackbar.error("Error deleting category");
        return throwError(err);
      }),
    )
  }
}   