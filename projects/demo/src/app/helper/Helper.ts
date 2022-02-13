export class DemoObservableTracker {
  constructor(public readonly id: string) {
  }
}

// marks an observable that is actually created by us. Not angular
// this is used for tracking and debugging memory leak
export function markAsDemo(obs: any, id: string): any {
  obs['cd-demo-tracker'] = new DemoObservableTracker(id);
  return obs
}

