import { autoserializeAs, deserializeAs } from "dcerialize";

/**
 * Objective model
 */
export class Activity {
    /**
     * Activity name
     */
    @autoserializeAs(() => String) name: string;

    /**
     * Activity description
     */
    @autoserializeAs(() => String) description: string | undefined;

    /**
     * Activity ID
     */
    @deserializeAs(() => Number) id: number | undefined;

    /**
     * Category ID
     */
    @autoserializeAs(() => Number, 'category') category: number | undefined;

    /**
     * Constructor
     */
    constructor(
        name: string,
        description?: string,
        category?: number,
        id?: number,
    ) {
        this.name = name;
        this.description = description;
        this.id = id;
        this.category = category;
    }
}