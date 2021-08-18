import { deserializeAs, autoserializeAs } from "dcerialize";

/**
 * Category colors
 */
export enum CategoryColor {
    DEFAULT,
    LIGHT_BLUE,
    DARK_BLUE ,
    LIGHT_GREEN,
    DARK_GREEN,
    LIGHT_PINK,
    DARK_PINK,
    LIGHT_YELLOW,
    DARK_YELLOW,
    LIGHT_PURPLE,
    DARK_PURPLE
}

/**
 * Color data
 */
interface ColorData {
    storageName: string,
    displayName: string
}

/**
 * Category color data for display
 */
export const ColorDataMap: {[color in CategoryColor]: ColorData} = {
    [CategoryColor.DEFAULT]: {storageName: 'default', displayName: 'Default'},
    [CategoryColor.LIGHT_BLUE]: {storageName: 'light_blue', displayName: 'Light Blue'},
    [CategoryColor.DARK_BLUE]: {storageName: 'dark_blue', displayName: 'Dark Blue'},
    [CategoryColor.LIGHT_GREEN]:{storageName: 'light_green', displayName: 'Light Green'},
    [CategoryColor.DARK_GREEN]: {storageName: 'dark_green', displayName: 'Dark Green'},
    [CategoryColor.LIGHT_PINK]: {storageName: 'light_pink', displayName: 'Light Pink'},
    [CategoryColor.DARK_PINK]: {storageName: 'dark_pink', displayName: 'Dark Pink'},
    [CategoryColor.LIGHT_YELLOW]: {storageName: 'light_yellow', displayName: 'Light Yellow'},
    [CategoryColor.DARK_YELLOW]: {storageName: 'dark_yellow', displayName: 'Dark Yellow'},
    [CategoryColor.LIGHT_PURPLE]: {storageName: 'light_purple', displayName: 'Light Purple'},
    [CategoryColor.DARK_PURPLE]: {storageName: 'dark_purple', displayName: 'Dark Purple'}
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
    @autoserializeAs(() => String) color: string;

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
        this.color = ColorDataMap[color].storageName;
    }
}