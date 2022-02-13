import {Injectable} from "@angular/core";
import {ObservableReference} from "../model/types";
import {BehaviorSubject, Observable} from "rxjs";

export class ObservableReadyListener {
  constructor(public readonly ids: string[], public readonly callback: () => void) {
  }
}

type StringOrObservableReference = string | ObservableReference;

function refToKey(ref: StringOrObservableReference): string {
  return ref instanceof ObservableReference ? ref.observableId : ref;
}

@Injectable()
export class DynamicObservableOrchestrationService {
  private readonly observablesMap: Map<string, Observable<any>> = new Map<string, Observable<any>>();
  private readonly observableReadyListeners: ObservableReadyListener[] = [];

  private tempRef: any[] = [];


  public waitFor(refs: StringOrObservableReference[], callback: () => void): void {
    if (refs !== undefined) {
      const newListener = new ObservableReadyListener(refs.map(refToKey), callback);
      if (!this.triggerListenerIfReady(newListener)) {
        this.observableReadyListeners.push(newListener)
      }
    } else {
      callback();
    }
  }

  public addObject(ref: StringOrObservableReference, obs: Observable<any>) {
    const key = refToKey(ref);
    console.log(`adding observable ${key}`);
    if (this.observablesMap.has(key)) {
      throw new Error(`${key} is already registered`);
    }
    this.observablesMap.set(key, obs);
    this.checkListeners();
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

  public revokeObject(ref: StringOrObservableReference): boolean {
    const key = refToKey(ref);
    console.log(`removing observable ${key}`);
    const result = this.observablesMap.delete(key);
    console.log(this.observablesMap);
    return result;
  }

  // just for experiment
  // this mimics that a component is still held after it's life cycle and not garbage collected for some reason
  public holdRef(obj:any){
    this.tempRef.push(obj);
  }


  // private methods

  private triggerListenerIfReady(listener: ObservableReadyListener): boolean {
    let trigger = true;
    for (const id of listener.ids) {
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

  private checkListeners(): void {
    for (let i = this.observableReadyListeners.length - 1; i >= 0; i--) {
      const trigger = this.triggerListenerIfReady(this.observableReadyListeners[i]);
      if (trigger) {
        this.observableReadyListeners.splice(i, 1);
      }
    }
  }
}


