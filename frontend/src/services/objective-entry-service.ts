import axios from 'axios-observable';
import { Deserialize, DeserializeArray, IJsonArray, IJsonObject, Serialize } from 'dcerialize';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { toISOLocal } from 'src/utils';
import { ObjectiveEntry } from '../models/objective-entry';
import { CRUDL } from './crudl';
import snackbar from 'src/SnackbarUtils';

interface ObjectiveEntryParameters {
  date?: Date
}

export class ObjectiveEntryService implements CRUDL {
  // Base URL
  baseUrl = '/objective-entries/'

  /**
   * Returns a list of all the objectives
   */
  list(params?: ObjectiveEntryParameters): Observable<ObjectiveEntry[]> {
    // Format parameters
    let sendParams: any = {};
    if (params?.date) {
      sendParams = {date: toISOLocal(params.date).split('T')[0]};
    }

    return axios.get<IJsonArray>(this.baseUrl, {params: sendParams})
      .pipe(
        map(result => DeserializeArray(result.data, () => ObjectiveEntry)),
        catchError(err => {
          snackbar.error("Error retrieving objective entry list");
          return throwError(err);
        }),
      );
  }

  /**
   * Get a resource by ID
   */
  get(id: number): Observable<ObjectiveEntry> {
    return axios.get<IJsonObject>(`${this.baseUrl}${id}`)
      .pipe(
        map(result => Deserialize(result.data, () => ObjectiveEntry)),
        catchError(err => {
          snackbar.error("Error retrieving objective entry");
          return throwError(err);
        }),
      );
  }

  /**
   * Add a new resource
   */
  post(data: ObjectiveEntry): Observable<ObjectiveEntry> {
    return axios.post<IJsonObject>(this.baseUrl, Serialize(data, () => ObjectiveEntry))
      .pipe(
        map(result => Deserialize(result.data, () => ObjectiveEntry)),
        catchError(err => {
          snackbar.error("Error creating objective entry");
          return throwError(err);
        }),
      );
  }

  /**
   * Update a resource
   */
  update(data: ObjectiveEntry): Observable<ObjectiveEntry> {
    return axios.put<IJsonObject>(`${this.baseUrl}${data.id}`, Serialize(data, () => ObjectiveEntry))
      .pipe(
        map(result => Deserialize(result.data, () => ObjectiveEntry)),
        catchError(err => {
          snackbar.error("Error retrieving objective entry");
          return throwError(err);
        }),
      );
  }

  /**
   * Delete an objective entry by ID
   */
  delete(id: number): Observable<any> {
    return axios.delete<null>(`${this.baseUrl}${id}`)
    .pipe(
      catchError(err => {
        snackbar.error("Error retrieving objective entry");
        return throwError(err);
      }),
    );
  }
}   