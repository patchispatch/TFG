import { deserializeAs, autoserializeAs } from "dcerialize";

/**
 * Category colors
 */
export enum CategoryColor {
    DEFAULT = 'default',
    LIGHT_BLUE = 'light_blue',
    DARK_BLUE = 'dark_blue',
    LIGHT_GREEN = 'light_green',
    DARK_GREEN = 'dark_green',
    LIGHT_PINK = 'light_pink',
    DARK_PINK = 'dark_pink',
    LIGHT_YELLOW = 'light_yellow',
    DARK_YELLOW = 'dark_yellow',
    LIGHT_PURPLE = 'light_purple',
    DARK_PURPLE = 'dark_purple'
}

/**
 * Color data
 */
interface ColorData {
    sampleColor: string
}

/**
 * Category color data info for display
 */
export const ColorDataMap: {[color in CategoryColor]: ColorData} = {
    [CategoryColor.DEFAULT]: {sampleColor: ''},
    [CategoryColor.LIGHT_BLUE]: {sampleColor: ''},
    [CategoryColor.DARK_BLUE]: {sampleColor: ''},
    [CategoryColor.LIGHT_GREEN]:{sampleColor: ''},
    [CategoryColor.DARK_GREEN]: {sampleColor: ''},
    [CategoryColor.LIGHT_PINK]: {sampleColor: ''},
    [CategoryColor.DARK_PINK]: {sampleColor: ''},
    [CategoryColor.LIGHT_YELLOW]: {sampleColor: ''},
    [CategoryColor.DARK_YELLOW]: {sampleColor: ''},
    [CategoryColor.LIGHT_PURPLE]: {sampleColor: ''},
    [CategoryColor.DARK_PURPLE]: {sampleColor: ''}
}

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
    @autoserializeAs(() => String) color: CategoryColor;

    /**
     * Constructor
     */
    constructor(
        name: string,
        color: CategoryColor,
        id?: number,
    ) {
        this.id = id;
        this.name = name;
        this.color = color;
    }
}