import { Objective } from '../models/objective';
import ApiService from './utils';


export class ObjectiveService extends ApiService<Objective> {
    constructor() {
        super("objectives");
    }

    // Add custom methods here
}