import { deserializeAs, autoserializeAs } from "dcerialize";


/**
 * Category model
 */
export class Category {
    /**
     * Category ID
     */
    @deserializeAs(() => Number) id: number | undefined;

    /**
     * Objective id
     */
    @autoserializeAs(() => String) name: string | undefined;

    /**
     * Date of entry
     */
    @autoserializeAs(() => Date) date: Date | undefined;

    /**
     * Constructor
     */
    constructor(
        id?: number,
        name?: string,
        date?: Date,
    ) {
        this.id = id;
        this.name = name;
        this.date = date;
    }
}