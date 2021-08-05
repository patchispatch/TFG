import { autoserializeAs, deserializeAs, deserializeAsArray, IJsonObject } from "dcerialize";


/**
 * Objective model
 */
export class ObjectiveEntry {
  /**
   * Objective id
   */
  @autoserializeAs(() => Number) objective_id: number;

  /**
   * Date of entry
   */
  @autoserializeAs(() => Date) date: Date;

  /**
   * Objective status
   */
  @autoserializeAs(() => Number) progress: number;
  
  /**
   * Objective entry ID
   */
  @deserializeAs(() => Number) id?: number | undefined;

  
  static onSerialized(json: IJsonObject, instance: ObjectiveEntry): void {
    if (instance.date) {
        json.date = instance.date.toISOString();
    }
  }
  
    
  /**
   * Constructor
   */
  constructor(
    objective_id: number,
    date: Date,
    progress: number,
    id?: number,
  ) {
    this.objective_id = objective_id;
    this.date = date;
    this.progress = progress;
    this.id = id;
  }
}

/**
 * Objective entry days list
 */
export class ObjectiveEntryDaysList {
  /**
   * Day list
   */
  @deserializeAsArray(() => Number) days: number[];

  /**
   * Constructor
   */
  constructor(days: number[]) {
    this.days = days;
  }
}