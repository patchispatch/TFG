import { autoserializeAs, deserializeAs } from "dcerialize";

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
    @autoserializeAs(() => Boolean) paused: boolean;

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
        paused?: boolean,
        currentStreak?: number,
        bestStreak?: number,
        id?: number,
        progress?: number
    ) {
        this.name = name;
        this.goal = goal;
        this.paused = paused ? paused : false;
        this.currentStreak = currentStreak ? currentStreak : 0;
        this.bestStreak = bestStreak ? bestStreak : 0;
        this.id = id;
        this.categoryId = categoryId;
        this.progress = progress;
    }
}