export class CDObservableTracker {
  constructor(public readonly id: string) {
  }
}

// marks an observable that is actually created by us. Not angular
// this is used for tracking and debugging memory leak
export function markAsTracked(obs: any, id: string): any {
  obs['cd-tracker'] = new CDObservableTracker(id);
  return obs
}

// for various reason, when working in develop mode,
// components are not properly garbage collected.
// this results in all the property references got retained
// this function exists to manually cut the chains
export function setNullAttributes(obj: any){
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      obj[prop] = null;
    }
  }
}
