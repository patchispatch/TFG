import { autoserializeAs } from "dcerialize";
import { Color } from "src/theme";
import { AppView } from "./shared";

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
   * Objective title
   */
  @autoserializeAs(() => String, 'default_view') defaultView: AppView;


  /**
   * Constructor
   */
  constructor(
      resetDay: number,
      theme: Color,
      defaultView: AppView
  ) {
      this.resetDay = resetDay;
      this.theme = theme;
      this.defaultView = defaultView;
  }
}