import { autoserializeAs, deserializeAs } from "dcerialize";

/**
 * Objective status
 */
export enum ObjectiveStatus {
    ACTIVE = 'active',
    PAUSED = 'paused',
}


/**
 * Objective model
 */
export class Objective {
    /**
     * Objective ID
     */
    @deserializeAs(() => Number) id: number | undefined;

    /**
     * Objective title
     */
    @autoserializeAs(() => String) name: string | undefined;

    /**
     * Objective goal
     */
    @autoserializeAs(() => Number) goal: number | undefined;

    /**
     * Objective status
     */
    @autoserializeAs(() => String) status: ObjectiveStatus | undefined;

    /**
     * Current streak
     */
    @autoserializeAs(() => Number) current_streak: number | undefined;

    /**
     * Best streak
     */
    @autoserializeAs(() => Number) best_streak: number | undefined;
    
    /**
     * Constructor
     */
    constructor(
        id?: number,
        name?: string,
        goal?: number,
        status?: ObjectiveStatus,
        current_streak?: number,
        best_streak?: number,
    ) {
        this.id = id;
        this.name = name;
        this.goal = goal;
        this.status = status;
        this.current_streak = current_streak;
        this.best_streak = best_streak;
    }
}