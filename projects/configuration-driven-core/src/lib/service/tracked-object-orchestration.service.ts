import {Injectable} from "@angular/core";
import {TrackedBehaviorSubject, TrackedObservable, TrackedObject, ObservableReference} from "../model/tracked-types";

export class ObjectReadyListener {
  constructor(public readonly ids: string[], public readonly callback: () => void) {
  }
}

type StringOrObservableReference = string | ObservableReference;

function refToKey(ref: StringOrObservableReference): string {
  return ref instanceof ObservableReference ? ref.observableId : ref;
}

@Injectable({providedIn: "root"})
export class TrackedObjectOrchestrationService {
  private readonly trackedObjectMap: Map<string, TrackedObject> = new Map<string, TrackedObject>();
  private readonly trackedObjectReadyListeners: ObjectReadyListener[] = [];

  public waitFor(refs: StringOrObservableReference[], callback: () => void): void {
    if (refs !== undefined) {
      const newListener = new ObjectReadyListener(refs.map(refToKey), callback);
      if (!this.triggerListenerIfReady(newListener)) {
        this.trackedObjectReadyListeners.push(newListener)
      }
    } else {
      callback();
    }
  }

  public addObject(obj: TrackedObject) {
    console.log(`adding tracked obj ${obj.id}`);
    if (this.trackedObjectMap.has(obj.id)) {
      throw new Error(`${obj.id} is already registered`);
    }
    this.trackedObjectMap.set(obj.id, obj);
    this.checkListeners();
  }

  public getObservable(ref: StringOrObservableReference): TrackedObservable {
    let obj = this.getTrackedObject(ref);
    if (obj instanceof TrackedObservable) {
      return obj;
    } else {
      throw new Error(`${obj.id} is not a tracked observable`)
    }
  }

  public getBehaviorSubject(ref: StringOrObservableReference): TrackedBehaviorSubject {
    let obj = this.getTrackedObject(ref);
    if (obj instanceof TrackedBehaviorSubject) {
      return obj;
    } else {
      throw new Error(`${obj.id} is not a tracked behavior subject`)
    }
  }

  public revokeObject(ref: StringOrObservableReference): boolean {
    const key = refToKey(ref);
    console.log(`removing obj ${key}`);
    const result = this.trackedObjectMap.delete(key);
    console.log(this.trackedObjectMap);
    return result;
  }


  // private methods

  private triggerListenerIfReady(listener: ObjectReadyListener): boolean {
    let trigger = true;
    for (const id of listener.ids) {
      if (!this.trackedObjectMap.has(id)) {
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
    for (let i = this.trackedObjectReadyListeners.length - 1; i >= 0; i--) {
      const trigger = this.triggerListenerIfReady(this.trackedObjectReadyListeners[i]);
      if (trigger) {
        this.trackedObjectReadyListeners.splice(i, 1);
      }
    }
  }

  public getTrackedObject(ref: StringOrObservableReference): TrackedObject {
    const key: string = refToKey(ref);
    if (!this.trackedObjectMap.has(key)) {
      throw new Error(`${key} is not registered yet. this method should only be used in the waitFor() callback`)
    }
    return this.trackedObjectMap.get(key);
  }
}


