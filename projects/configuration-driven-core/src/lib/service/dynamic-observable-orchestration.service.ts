import {Injectable} from "@angular/core";
import {ObservableReference} from "../model/types";
import {BehaviorSubject, Observable} from "rxjs";
import * as uuid from 'uuid';

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
  private readonly observableReadyListeners: { [observableId: string]: { [listenerId: string]: ObservableReadyListener } } = {}

  public waitFor(refs: StringOrObservableReference[], callback: () => void): void {
    if (refs !== undefined) {
      const newListener = new ObservableReadyListener(refs.map(refToKey), callback);
      if (!this.triggerListenerIfReady(newListener)) {
        this.addListener(newListener);
      }
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
    this.checkListeners(key);
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
    console.log(`removing observable ${key}`);
    // console.log(this.observablesMap);
    return this.observablesMap.delete(key);
  }

  // private methods

  private triggerListenerIfReady(listener: ObservableReadyListener): boolean {
    let trigger = true;
    for (const id of listener.observableIds) {
      if (!this.observablesMap.has(id)) {
        trigger = false;
        break;
      }
    }

    if (trigger) {
      listener.callback();
    }

    return trigger;
  }

  private addListener(newListener: ObservableReadyListener): void {
    for (const observableId of newListener.observableIds) {
      if (!this.observableReadyListeners[observableId]) {
        this.observableReadyListeners[observableId] = {}
      }
      this.observableReadyListeners[observableId][newListener.id] = newListener;
    }
  }

  private checkListeners(observableId: string): void {
    let listenersForTheObservable = this.observableReadyListeners[observableId];
    if (listenersForTheObservable) {
      for (const [listenerId, listener] of Object.entries(listenersForTheObservable)) {
        if (listenersForTheObservable[listenerId]) {
          const trigger = this.triggerListenerIfReady(listener);
          if (trigger) {
            delete listenersForTheObservable[listenerId];
            if (Object.keys(listenersForTheObservable).length === 0) {
              delete this.observableReadyListeners[observableId];
            }
          }
        }
      }
    }
  }
}


