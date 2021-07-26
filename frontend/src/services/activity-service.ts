import axios from 'axios-observable';
import { Deserialize, DeserializeArray, IJsonArray, IJsonObject } from 'dcerialize';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Activity } from '../models/activity';
import { CRUDL } from './crudl';
import snackbar from 'src/SnackbarUtils';


export class ActivityService implements CRUDL {
  // Base URL
  baseUrl = '/categories'

  /**
   * Returns a list of all the categories
   */
  list(): Observable<Activity[]> {
    return axios.get<IJsonArray>(this.baseUrl)
      .pipe(
        map(result => DeserializeArray(result.data, () => Activity)),
        catchError(err => {
          snackbar.error("Error retrieving Activity list");
          return throwError(err);
        }),
      );
  }

  /**
   * Get a resource by ID
   */
  get(id: number): Observable<Activity> {
    return axios.get<IJsonObject>(`${this.baseUrl}/${id}`)
      .pipe(
        map(result => Deserialize(result.data, () => Activity)),
        catchError(err => {
          snackbar.error("Error retrieving Activity");
          return throwError(err);
        }),
      );
  }

  /**
   * Add a new Activity
   */
  post(data: Activity): Observable<Activity> {
    return axios.post<IJsonObject>(this.baseUrl, data)
      .pipe(
        map(result => Deserialize(result.data, () => Activity)),
        catchError(err => {
          snackbar.error("Error creating Activity");
          return throwError(err);
        }),
      );
  }

  /**
   * Update a resource
   */
  update(data: Activity): Observable<Activity> {
    return axios.put<IJsonObject>(`${this.baseUrl}/${data.id}`, data)
      .pipe(
        map(result => Deserialize(result.data, () => Activity)),
        catchError(err => {
          snackbar.error("Error updating Activity");
          return throwError(err);
        }),
      );
  }

  /**
   * Delete an Activity by ID
   */
  delete(id: number): Observable<any> {
    return axios.delete<null>(`${this.baseUrl}/${id}`)
    .pipe(
      catchError(err => {
        snackbar.error("Error deleting Activity");
        return throwError(err);
      }),
    )
  }
}   