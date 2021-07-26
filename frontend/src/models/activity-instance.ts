import { autoserializeAs, deserializeAs } from "dcerialize";

/**
 * Objective model
 */
export class Activity {
    /**
     * Instance day of week
     */
    @autoserializeAs(() => Number) day: number;

    /**
     * Instance start hour
     */
    @autoserializeAs(() => Date, 'start_hour') startHour: Date;

    /**
     * Instance end hour
     */
    @deserializeAs(() => Date, 'end_hour') endHour: Date;

    /**
     * instance activity
     */
    @autoserializeAs(() => Number) activity: number;

    /**
     * Instance ID
     */
    @autoserializeAs(() => Number) id: number | undefined;

    /**
     * Constructor
     */
    constructor(
        day: number,
        startHour: Date,
        endHour: Date,
        activity: number,
        id?: number
    ) {
        this.day = day;
        this.startHour = startHour;
        this.endHour = endHour;
        this.activity = activity;
        this.id = id;
    }
}