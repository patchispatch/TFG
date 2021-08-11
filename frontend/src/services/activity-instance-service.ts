import axios from 'axios-observable';
import { Deserialize, DeserializeArray, IJsonArray, IJsonObject, Serialize } from 'dcerialize';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ActivityInstance } from '../models/activity-instance';
import { CRUDL } from './crudl';
import snackbar from 'src/SnackbarUtils';


export class ActivityInstanceService implements CRUDL {
  // Base URL
  baseUrl = '/activity-instances/'

  /**
   * Returns a list of all the categories
   */
  list(): Observable<ActivityInstance[]> {
    return axios.get<IJsonArray>(this.baseUrl)
      .pipe(
        map(result => DeserializeArray(result.data, () => ActivityInstance)),
        catchError(err => {
          snackbar.error("Error retrieving ActivityInstance list");
          return throwError(err);
        }),
      );
  }

  /**
   * Get a resource by ID
   */
  get(id: number): Observable<ActivityInstance> {
    return axios.get<IJsonObject>(`${this.baseUrl}${id}`)
      .pipe(
        map(result => Deserialize(result.data, () => ActivityInstance)),
        catchError(err => {
          snackbar.error("Error retrieving ActivityInstance");
          return throwError(err);
        }),
      );
  }

  /**
   * Add a new ActivityInstance
   */
  post(data: ActivityInstance): Observable<ActivityInstance> {
    return axios.post<IJsonObject>(this.baseUrl, Serialize(data, () => ActivityInstance))
      .pipe(
        map(result => Deserialize(result.data, () => ActivityInstance)),
        catchError(err => {
          snackbar.error("Error creating ActivityInstance");
          return throwError(err);
        }),
      );
  }

  /**
   * Update a resource
   */
  update(data: ActivityInstance): Observable<ActivityInstance> {
    return axios.put<IJsonObject>(`${this.baseUrl}${data.id}`, data)
      .pipe(
        map(result => Deserialize(result.data, () => ActivityInstance)),
        catchError(err => {
          snackbar.error("Error updating ActivityInstance");
          return throwError(err);
        }),
      );
  }

  /**
   * Delete an ActivityInstance by ID
   */
  delete(id: number): Observable<any> {
    return axios.delete<null>(`${this.baseUrl}${id}`)
    .pipe(
      catchError(err => {
        snackbar.error("Error deleting ActivityInstance");
        return throwError(err);
      }),
    )
  }
}   