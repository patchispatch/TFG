import axios from 'axios-observable';
import { Deserialize, DeserializeArray, IJsonArray, IJsonObject, Serialize } from 'dcerialize';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ObjectiveEntry } from 'src/models/objective-entry';
import { Objective } from '../models/objective';
import { CRUDL } from './crudl';


export class ObjectiveService implements CRUDL {
  // Base URL
  baseUrl = '/objectives/'

  /**
   * Returns a list of all the objectives
   */
  list(): Observable<Objective[]> {
    return axios.get<IJsonArray>(this.baseUrl)
      .pipe(
        map(result => DeserializeArray(result.data, () => Objective)),
        catchError(err => of(err))
      );
  }

  /**
   * Get a resource by ID
   */
  get(id: number): Observable<Objective> {
    return axios.get<IJsonObject>(`${this.baseUrl}${id}`)
      .pipe(
        map(result => Deserialize(result.data, () => Objective)),
        catchError(err => of(err))
      );
  }

  /**
   * Add a new objective
   */
  post(data: Objective): Observable<Objective> {
    return axios.post<IJsonObject>(this.baseUrl, Serialize(data, () => Objective))
      .pipe(
        map(result => Deserialize(result.data, () => Objective)),
        catchError(err => of(err))
      );
  }

  /**
   * Update a resource
   */
  update(data: Objective): Observable<Objective> {
    return axios.put<IJsonObject>(`${this.baseUrl}${data.id}/`, Serialize(data, () => Objective))
      .pipe(
        map(result => Deserialize(result.data, () => Objective)),
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

  // Objective entry 'shortcut' endpoints

  /**
   * Adds an entry to an objective
   */
  addEntry(id: number, data: ObjectiveEntry): Observable<ObjectiveEntry> {
    return axios.post<IJsonObject>(`${this.baseUrl}${id}/entries/`, Serialize(data, () => ObjectiveEntry))
    .pipe(
      map(result => Deserialize(result.data, () => ObjectiveEntry)),
      catchError(err => of(err))
    );
  }

  /**
   * List all entries of an objective
   */
  listEntries(id: number): Observable<ObjectiveEntry[]> {
    return axios.get<IJsonArray>(`${this.baseUrl}${id}/entries/`)
    .pipe(
      map(result => DeserializeArray(result.data, () => ObjectiveEntry)),
      catchError(err => of(err))
    );
  }

  /**
   * Pause or resume an objective
   */
  pauseResume(id: number): Observable<Objective> {
    return axios.get<IJsonObject>(`${this.baseUrl}${id}/pause-resume/`)
    .pipe(
      map(result => Deserialize(result.data, () => Objective)),
      catchError(err => of(err))
    );
  }
}