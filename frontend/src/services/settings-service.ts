import axios from 'axios-observable';
import { Deserialize, IJsonObject, Serialize } from 'dcerialize';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import snackbar from 'src/SnackbarUtils';
import { Settings } from 'src/models/settings';


export class SettingsService {
  // Base URL
  baseUrl = '/settings/'

  /**
   * Get settings
   */
  get(): Observable<Settings> {
    return axios.get<IJsonObject>(`${this.baseUrl}get/`)
      .pipe(
        map(result => Deserialize(result.data, () => Settings)),
        catchError(err => {
          snackbar.error("Error retrieving settings");
          return throwError(err);
        }),
      );
  }

  /**
   * Update a resource
   */
  update(data: Settings): Observable<Settings> {
    return axios.put<IJsonObject>(`${this.baseUrl}update/`, Serialize(data, () => Settings))
      .pipe(
        map(result => Deserialize(result.data, () => Settings)),
        catchError(err => {
          snackbar.error("Error updating settings");
          return throwError(err);
        }),
      );
  }
}   