import axios from "axios";
import { IJsonArray, DeserializeArray, IJsonObject, Deserialize, Serialize } from "dcerialize";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Objective, ObjectiveStatus } from "src/models/objective";
import { CRUDL } from "../crudl";

export class ObjectiveService implements CRUDL {

  // Mock data
  objectives: Objective[] = [
    new Objective(
      "Test objective 1", 
      1,
      undefined,
      ObjectiveStatus.ACTIVE,
      0,
      0,
      1
    ),
    new Objective(
      "Test objective 2", 
      1, 
      2, 
      ObjectiveStatus.PAUSED,
      0,
      0,
      2
    ),
    new Objective(
      "TestObjective 3", 
      10,
      2,
      ObjectiveStatus.ACTIVE,
      3,
      7,
      3
    )
  ];

  /**
   * Returns a list of all the objectives
   */
  list(): Observable<Objective[]> {
      return of(this.objectives);
  }

  /**
   * Get a resource by ID
   */
  get(id: number): Observable<Objective | undefined> {
      return of(this.objectives.find(obj => obj.id === id));
  }

  /**
   * Add a new objective
   */
  post(data: Objective): Observable<Objective> {
    data.id = this.objectives[this.objectives.length -1].id! + 1;
    this.objectives.push(data);
    return of(data);
  }

  /**
   * Update a resource
   */
  update(data: Objective): Observable<Objective> {
    const index = this.objectives.findIndex(obj => obj.id === data.id);
    this.objectives[index] = data;
    return of(data);
  }

  /**
   * Delete an objective by ID
   */
  delete(id: number): Observable<null> {
    const index = this.objectives.findIndex(obj => obj.id === id);
    this.objectives.splice(index);
    return of(null);
  }
}   