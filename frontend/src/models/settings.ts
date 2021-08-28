import { autoserializeAs } from "dcerialize";
import { Color } from "src/theme";

/**
 * Objective model
 */
export class Settings {
  /**
   * Objective title
   */
  @autoserializeAs(() => Number, 'weekly_reset_day') resetDay: number;

  /**
   * Objective title
   */
  @autoserializeAs(() => String) theme: Color;


  /**
   * Constructor
   */
  constructor(
      resetDay: number,
      theme: Color,
  ) {
      this.resetDay = resetDay;
      this.theme = theme;
  }
}