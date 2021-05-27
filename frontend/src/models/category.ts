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
     * Category name
     */
    @autoserializeAs(() => String) name: string | undefined;

    /**
     * Constructor
     */
    constructor(
        id?: number,
        name?: string,
    ) {
        this.id = id;
        this.name = name;
    }
}