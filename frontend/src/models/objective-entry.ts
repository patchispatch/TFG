import { autoserializeAs, deserializeAs } from "dcerialize";


/**
 * Objective model
 */
export class ObjectiveEntry {
    /**
     * Objective entry ID
     */
    @deserializeAs(() => Number) id: number | undefined;

    /**
     * Objective id
     */
    @autoserializeAs(() => Number) objective_id: number | undefined;

    /**
     * Date of entry
     */
    @autoserializeAs(() => Date) date: Date | undefined;

    /**
     * Objective status
     */
    @autoserializeAs(() => Number) progress: number | undefined;

    
    /**
     * Constructor
     */
    constructor(
        id?: number,
        objective_id?: number,
        date?: Date,
        progress?: number,
    ) {
        this.id = id;
        this.objective_id = objective_id;
        this.date = date;
        this.progress = progress;
    }
}