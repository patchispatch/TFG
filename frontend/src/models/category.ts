import { deserializeAs, autoserializeAs } from "dcerialize";
import { Color } from "src/theme";

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
    @autoserializeAs(() => String) name: string;

    /** 
     * Category color
    */
    @autoserializeAs(() => String) color: Color;

    /**
     * Constructor
     */
    constructor(
        name: string,
        color: Color,
        id?: number,
    ) {
        this.id = id;
        this.name = name;
        this.color = color;
    }
}