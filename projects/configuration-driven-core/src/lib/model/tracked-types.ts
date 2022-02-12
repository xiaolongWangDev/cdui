import {BehaviorSubject, Observable} from "rxjs";

export class ObservableReference {
  constructor(public readonly observableId: string) {
  }
}

export type ValueOrObservableReference = any | ObservableReference;

export type TrackedObject = TrackedObservable | TrackedBehaviorSubject;

export class TrackedObservable {
  public readonly id: string;

  constructor(ref: string | ObservableReference, public readonly observable: Observable<any>) {
    this.id = ref instanceof ObservableReference ? ref.observableId : ref;
  }
}

export class TrackedBehaviorSubject {
  public readonly id: string;

  constructor(ref: string | ObservableReference, public readonly behaviorSubject: BehaviorSubject<any>) {
    this.id = ref instanceof ObservableReference ? ref.observableId : ref;
  }
}
