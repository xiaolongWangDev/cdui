import {Injectable} from "@angular/core";
import {ObservableReference} from "../model/types";
import {BehaviorSubject, combineLatest, Observable, ReplaySubject, Subject} from "rxjs";
import * as uuid from 'uuid';
import {takeUntil} from "rxjs/operators";
import {markAsTracked} from "../Helper";

export class ObservableReadyListener {
  public readonly id: string;

  constructor(public readonly observableIds: string[], public readonly callback: () => void) {
    this.id = uuid.v4();
  }
}

type StringOrObservableReference = string | ObservableReference;

function refToKey(ref: StringOrObservableReference): string {
  return ref instanceof ObservableReference ? ref.observableId : ref;
}

@Injectable()
export class DynamicObservableOrchestrationService {
  private readonly observablesMap: Map<string, Observable<any>> = new Map<string, Observable<any>>();
  private readonly observableReadyEvents: Map<string, ReplaySubject<void>> = new Map<string, ReplaySubject<void>>();

  public waitFor(refs: StringOrObservableReference[], callback: () => void, noLongerNeeded: Subject<void>): void {
    if (refs && refs.length) {
      const readyEvents: ReplaySubject<void>[] = [];
      for (const key of refs.map(refToKey)) {
        this.createEventIfNotExist(key);
        readyEvents.push(this.observableReadyEvents.get(key));
      }
      combineLatest(readyEvents).pipe(takeUntil(noLongerNeeded)).subscribe(() => {
        callback();
      });
    } else {
      callback();
    }
  }

  public addObservable(ref: StringOrObservableReference, obs: Observable<any>) {
    const key = refToKey(ref);
    console.log(`adding observable ${key}`);
    if (this.observablesMap.has(key)) {
      throw new Error(`${key} is already registered`);
    }
    this.observablesMap.set(key, obs);

    // next, will set the subject saying the observable is ready
    // if no dependant hit the service before, there won't be a subject yet, in that case, we will create one
    this.createEventIfNotExist(key)
    this.observableReadyEvents.get(key).next();
  }

  public getObservable(ref: StringOrObservableReference): Observable<any> {
    const key = refToKey(ref);
    if (!this.observablesMap.has(key)) {
      throw new Error(`${key} is not registered yet. this method should only be used in the waitFor() callback`)
    }
    return this.observablesMap.get(key);
  }

  public getBehaviorSubject(ref: StringOrObservableReference): BehaviorSubject<any> {
    const key = refToKey(ref);
    let obj = this.getObservable(key);
    if (obj instanceof BehaviorSubject) {
      return obj;
    } else {
      throw new Error(`${key} is not a behavior subject`)
    }
  }

  public revokeObservable(ref: StringOrObservableReference): boolean {
    const key = refToKey(ref);

    // remove the ready event since it will no longer be valid
    console.log(`removing event for ${key}`);
    this.observableReadyEvents.get(key).complete();
    this.observableReadyEvents.delete(key);
    console.log(this.observableReadyEvents);

    console.log(`removing observable ${key}`);
    // console.log(this.observablesMap);
    return this.observablesMap.delete(key);
  }

  // private
  private createEventIfNotExist(key: string) {
    if (!this.observableReadyEvents.has(key)) {
      console.log(`adding event for ${key}`);
      this.observableReadyEvents.set(key, markAsTracked(new ReplaySubject<void>(1), `ready_event_${key}`));
    }
  }

}


