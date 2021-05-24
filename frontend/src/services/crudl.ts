import { Observable } from 'rxjs';

/**
 * Interface for CRUDL services
 */
export interface CRUDL {
    list(): Observable<any>;
    get(id: number): Observable<any>;
    update(data: any): Observable<any>;
    post(data: any): Observable<any>;
    delete(id: number): Observable<null>;
}