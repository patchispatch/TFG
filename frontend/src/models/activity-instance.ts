import { autoserializeAs, deserializeAs, onDeserialized, serializeAs } from "dcerialize";

/**
 * Activity instance model
 */
export class ActivityInstance {
    /**
     * Instance day of week
     */
    @autoserializeAs(() => Number) day: number;

    /**
     * Instance start hour
     */
    @autoserializeAs(() => String, 'start_hour') startHour: string;

    /**
     * Instance end hour
     */
    @autoserializeAs(() => String, 'end_hour') endHour: string;

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
        startHour: string,
        endHour: string,
        activity: number,
        id?: number
    ) {
        this.day = day;
        this.startHour = startHour;
        this.endHour = endHour;
        this.activity = activity;
        this.id = id;
    }

    @onDeserialized
    sliceHours() {
        this.startHour = this.startHour.slice(0, -3);
        this.endHour = this.endHour.slice(0, -3);
    }
}
