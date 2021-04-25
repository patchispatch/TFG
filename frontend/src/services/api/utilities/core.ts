// core.ts

import {apiProvider} from './provider';

enum ApiOptions {
    list = 'LIST',
    get = 'GET',
    post = 'POST',
    update = 'UPDATE',
    partialUpdate = 'PARTIAL',
    remove = 'REMOVE',
}

export class ApiCore {
    list?: () => any;
    get?: (id: number) => any;
    post?: (model: any) => any;
    update?: (model: any) => any;
    partialUpdate?: (model: any) => any;
    remove?: (id: any) => any;


    constructor(resource: string, options: ApiOptions[]) {
        if (options.includes(ApiOptions.list)) {
            this.list = () => {
                return apiProvider.list(resource);
            };
        }

        if (options.includes(ApiOptions.get)) {
            this.get = (id) => {
                return apiProvider.get(resource, id);
            };
        }

        if (options.includes(ApiOptions.post)) {
            this.post = (model) => {
                return apiProvider.post(resource, model);
            };
        }

        if (options.includes(ApiOptions.update)) {
            this.update = (model) => {
                return apiProvider.update(resource, model);
            };
        }

        if (options.includes(ApiOptions.partialUpdate)) {
            this.partialUpdate = (model) => {
                return apiProvider.partialUpdate(resource, model);
            };
        }

        if (options.includes(ApiOptions.remove)) {
            this.remove = (id) => {
                return apiProvider.get(resource, id);
            };
        }
        
    }
}