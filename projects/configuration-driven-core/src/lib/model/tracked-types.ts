import {BehaviorSubject, Observable} from "rxjs";

export class ObservableReference {
  constructor(public readonly observableId: string) {
  }
}

export type ValueOrObservableReference = any | ObservableReference;

export class TrackedObject {
  public readonly id: string;

  constructor(ref: string | ObservableReference) {
    this.id = ref instanceof ObservableReference ? ref.observableId : ref;
  }
}

export class TrackedObservable extends TrackedObject {
  constructor(ref: string | ObservableReference, public readonly observable: Observable<any>) {
    super(ref)
  }
}

export class TrackedBehaviorSubject extends TrackedObject {
  constructor(ref: string | ObservableReference, public readonly behaviorSubject: BehaviorSubject<any>) {
    super(ref)
  }
}
