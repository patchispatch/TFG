// core.ts

import {apiProvider} from './provider';
import { Observable } from 'rxjs';


export class ApiService<T> {
    list: () => Observable<any>;
    get: (id: number) => Observable<T>;
    post: (model: T) => Observable<T>;
    update: (model: T) => Observable<T>;
    partialUpdate: (model: T) => Observable<T>;
    remove: (id: number) => Observable<null>;


    constructor(resource: string) {
        this.list = () => {
            return apiProvider.list<T>(resource);
        };

        this.get = (id) => {
            return apiProvider.get<T>(resource, id);
        };

        this.post = (model) => {
            return apiProvider.post<T>(resource, model);
        };

        this.update = (model) => {
            return apiProvider.update<T>(resource, model);
        };

        this.partialUpdate = (model) => {
            return apiProvider.partialUpdate<T>(resource, model);
        };

        this.remove = (id) => {
            return apiProvider.remove(resource, id);
        };

    }
}