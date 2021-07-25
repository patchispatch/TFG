import axios from 'axios-observable';
import { Deserialize, DeserializeArray, IJsonArray, IJsonObject, Serialize } from 'dcerialize';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ObjectiveEntry } from 'src/models/objective-entry';
import { Objective } from '../models/objective';
import { CRUDL } from './crudl';
import snackbar from 'src/SnackbarUtils';


interface ObjectiveListParams {
  idlist?: number[],
}


export class ObjectiveService implements CRUDL {
  // Base URL
  baseUrl = '/objectives/'

  /**
   * Returns a list of all the objectives
   */
  list(params?: ObjectiveListParams): Observable<Objective[]> {
    let sendParams: any = {};
    if (params?.idlist) {
      sendParams = {id: params.idlist.map(String).toString()};
    }

    return axios.get<IJsonArray>(this.baseUrl, {params: sendParams})
      .pipe(
        map(result => DeserializeArray(result.data, () => Objective)),
        catchError(err => {
          snackbar.error("Error retrieving objective list");
          return throwError(err);
        }),
      );
  }

  /**
   * Get a resource by ID
   */
  get(id: number): Observable<Objective> {
    return axios.get<IJsonObject>(`${this.baseUrl}${id}`)
      .pipe(
        map(result => Deserialize(result.data, () => Objective)),
        catchError(err => {
          snackbar.error("Error retrieving objective");
          return throwError(err);
        }),
      );
  }

  /**
   * Add a new objective
   */
  post(data: Objective): Observable<Objective> {
    return axios.post<IJsonObject>(this.baseUrl, Serialize(data, () => Objective))
      .pipe(
        map(result => Deserialize(result.data, () => Objective)),
        catchError(err => {
          snackbar.error("Error creating objective");
          return throwError(err);
        }),
      );
  }

  /**
   * Update a resource
   */
  update(data: Objective): Observable<Objective> {
    return axios.put<IJsonObject>(`${this.baseUrl}${data.id}/`, Serialize(data, () => Objective))
      .pipe(
        map(result => Deserialize(result.data, () => Objective)),
        catchError(err => {
          snackbar.error("Error updateing objective");
          return throwError(err);
        }),
      );
  }

  /**
   * Delete an objective by ID
   */
  delete(id: number): Observable<any> {
    return axios.delete<null>(`${this.baseUrl}${id}`)
    .pipe(
      catchError(err => {
        snackbar.error("Error deleting objective");
        return throwError(err);
      }),
    )
  }

  // Objective entry 'shortcut' endpoints

  /**
   * Adds an entry to an objective
   */
  addEntry(id: number, data: ObjectiveEntry): Observable<ObjectiveEntry> {
    return axios.post<IJsonObject>(`${this.baseUrl}${id}/entries/`, Serialize(data, () => ObjectiveEntry))
    .pipe(
      map(result => Deserialize(result.data, () => ObjectiveEntry)),
      catchError(err => {
        snackbar.error("Error creating objective entry");
        return throwError(err);
      }),
    );
  }

  /**
   * List all entries of an objective
   */
  listEntries(id: number): Observable<ObjectiveEntry[]> {
    return axios.get<IJsonArray>(`${this.baseUrl}${id}/entries/`)
    .pipe(
      map(result => DeserializeArray(result.data, () => ObjectiveEntry)),
      catchError(err => {
        snackbar.error("Error retrieving objective entry list");
        return throwError(err);
      }),
    );
  }

  /**
   * Pause or resume an objective
   */
  pauseResume(id: number): Observable<Objective> {
    return axios.get<IJsonObject>(`${this.baseUrl}${id}/pause-resume/`)
    .pipe(
      map(result => Deserialize(result.data, () => Objective)),
      catchError(err => {
        snackbar.error("Error changing objective status");
        return throwError(err);
      }),
    );
  }
}