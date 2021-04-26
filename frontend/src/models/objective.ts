// Objective model

import { autoserializeAs, deserializeAs } from "dcerialize";

export class Objective {
    /**
     * Objective ID
     */
    @deserializeAs(() => Number) id: number;

    /**
     * Objective title
     */
    @autoserializeAs(() => String) title: string;

    /**
     * Objective goal
     */
    @autoserializeAs(() => Number) goal: number;

    /**
     * Objective progress
     */
    @autoserializeAs(() => Number) progress: number;

    /**
     * Objective status
     * NOTE: maybe this is frontend-only since it's autocalculated to sort
     * the objective list. For now it stays like this and comes from the API
     */
    @autoserializeAs(() => Boolean) complete: boolean;

    
    /**
     * Constructor
     */
    constructor(
        id: number,
        title: string,
        goal: number,
        progress: number,
        complete: boolean
    ) {
        this.id = id;
        this.title = title;
        this.goal = goal;
        this.progress = progress;
        this.complete = complete;
    }
}