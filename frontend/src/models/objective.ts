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
     * Objective title
     */
    @autoserializeAs(() => String) name: string;

    /**
     * Objective goal
     */
    @autoserializeAs(() => Number) goal: number;

    /**
     * Objective ID
     */
    @deserializeAs(() => Number) id: number | undefined;

    /**
     * Objective status
     */
    @autoserializeAs(() => String) status: ObjectiveStatus;

    /**
     * Category ID
     */
    @autoserializeAs(() => Number, 'category_id') categoryId: number | undefined;

    /**
     * Current streak
     */
    @autoserializeAs(() => Number, 'current_streak') currentStreak: number;

    /**
     * Best streak
     */
    @autoserializeAs(() => Number, 'best_streak') bestStreak: number;

    /**
     * Current progress
     */
    @deserializeAs(() => Number) progress: number | undefined; 


    /**
     * Constructor
     */
    constructor(
        name: string,
        goal: number,
        categoryId?: number,
        status?: ObjectiveStatus,
        currentStreak?: number,
        bestStreak?: number,
        id?: number,
        progress?: number
    ) {
        this.name = name;
        this.goal = goal;
        this.status = status ? status : ObjectiveStatus.ACTIVE;
        this.currentStreak = currentStreak ? currentStreak : 0;
        this.bestStreak = bestStreak ? bestStreak : 0;
        this.id = id;
        this.categoryId = categoryId;
        this.progress = progress;
    }
}