import axios from 'axios-observable';
import { Deserialize, DeserializeArray, IJsonArray, IJsonObject, Serialize } from 'dcerialize';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { toISOLocal } from 'src/utils';
import { ObjectiveEntry } from '../models/objective-entry';
import { CRUDL } from './crudl';

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
        catchError(err => of(err))
      );
  }

  /**
   * Get a resource by ID
   */
  get(id: number): Observable<ObjectiveEntry> {
    return axios.get<IJsonObject>(`${this.baseUrl}${id}`)
      .pipe(
        map(result => Deserialize(result.data, () => ObjectiveEntry)),
        catchError(err => of(err))
      );
  }

  /**
   * Add a new objective
   */
  post(data: ObjectiveEntry): Observable<ObjectiveEntry> {
    return axios.post<IJsonObject>(this.baseUrl, Serialize(data, () => ObjectiveEntry))
      .pipe(
        map(result => Deserialize(result.data, () => ObjectiveEntry)),
        catchError(err => of(err))
      );
  }

  /**
   * Update a resource
   */
  update(data: ObjectiveEntry): Observable<ObjectiveEntry> {
    return axios.put<IJsonObject>(`${this.baseUrl}${data.id}`, Serialize(data, () => ObjectiveEntry))
      .pipe(
        map(result => Deserialize(result.data, () => ObjectiveEntry)),
        catchError(err => of(err))
      );
  }

  /**
   * Delete an objective by ID
   */
  delete(id: number): Observable<null> {
    return axios.delete<null>(`${this.baseUrl}${id}`)
    .pipe(
      catchError(err => of(err))
    )
  }
}   