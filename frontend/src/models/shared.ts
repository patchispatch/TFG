/**
 * Object with ID property
 */
 interface ModelWithID {
  id?: number
}

/**
 * Map of models indexed by ID
 */
 export interface ModelMap<M extends ModelWithID> {
  [key: number]: M;
}

/**
* Convert model array into ModelMap.
* Note: elements must have ID
*/
export function convertToMap<M extends ModelWithID>(array: M[]): ModelMap<M> {
const objMap: ModelMap<M> = {};
for (const objective of array) {
  objMap[objective.id!] = objective;
}

return objMap;
}