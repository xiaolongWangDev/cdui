import {Component} from '@angular/core';

@Component({
  templateUrl: "observable-orchestration-page.component.html"
})
export class ObservableOrchestrationPageComponent {
  classCode =
`@Injectable()
export class DynamicObservableOrchestrationService {
  private readonly observablesMap: Map<string, Observable<any>> = new Map<string, Observable<any>>();
  private readonly observableReadyEvents: Map<string, ReplaySubject<void>> = new Map<string, ReplaySubject<void>>();

  public waitFor(refs: StringOrObservableReference[], callback: () => void, noLongerNeeded: Subject<void>): void {
    if (refs && refs.length) {
      const readyEvents: ReplaySubject<void>[] = [];
      for (const key of refs.map(refToKey)) {
        if(key) {
          this.createEventIfNotExist(key);
          readyEvents.push(this.observableReadyEvents.get(key));
        }
      }
      if(readyEvents.length){
        combineLatest(readyEvents).pipe(takeUntil(noLongerNeeded)).subscribe(() => {
          callback();
        });
      }
    } else {
      callback();
    }
  }

  public addObservable(ref: StringOrObservableReference, obs: Observable<any>) {
    const key = refToKey(ref);
    console.log(\`adding observable \${key}\`);
    if (this.observablesMap.has(key)) {
      throw new Error(\`\${key} is already registered\`);
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
      throw new Error(\`\${key} is not registered yet. this method should only be used in the waitFor() callback\`)
    }
    return this.observablesMap.get(key);
  }

  public getBehaviorSubject(ref: StringOrObservableReference): BehaviorSubject<any> {
    const key = refToKey(ref);
    let obj = this.getObservable(key);
    if (obj instanceof BehaviorSubject) {
      return obj;
    } else {
      throw new Error(\`\${key} is not a behavior subject\`)
    }
  }

  public revokeObservable(ref: StringOrObservableReference): boolean {
    const key = refToKey(ref);

    // remove the ready event since it will no longer be valid
    // console.log(\`removing event for \${key}\`);
    this.observableReadyEvents.get(key).complete();
    this.observableReadyEvents.delete(key);
    // console.log(this.observableReadyEvents);

    console.log(\`removing observable \${key}\`);
    // console.log(this.observablesMap);
    return this.observablesMap.delete(key);
  }

  // private
  private createEventIfNotExist(key: string) {
    if (!this.observableReadyEvents.has(key)) {
      console.log(\`adding event for \${key}\`);
      this.observableReadyEvents.set(key, markAsTracked(new ReplaySubject<void>(1), \`ready_event_\${key}\`));
    }
  }

}`
  studentConfigInstanceCode =
`new HeadmasterConfiguration({
  name: "George", yieldingObservables: {
    tuition: {
      observableId: "tuition_amount_from_George"
    }
  },
  manages: [
    new TeacherConfiguration({
      name: "Tom", yieldingObservables: {
        homework: {
          observableId: "homework_from_tom"
        }
      },
      teaches: [
        new StudentConfiguration({
          name: "Alice",
          consumingObservables: {homework: "homework_from_tom", tuition: "tuition_amount_from_George"}
        }),
        new StudentConfiguration({
          name: "Bob",
          consumingObservables: {homework: "homework_from_tom", tuition: "tuition_amount_from_George"}
        }),
        new StudentConfiguration({
          name: "Charlie",
          consumingObservables: {homework: "homework_from_tom", tuition: "tuition_amount_from_George"}
        }),
      ]
    }),
    new TeacherConfiguration({
      name: "Jack", yieldingObservables: {
        homework: {
          observableId: "homework_from_jack"
        }
      },
      teaches: [
        new StudentConfiguration({
          name: "Donald",
          consumingObservables: {homework: "homework_from_jack", tuition: "tuition_amount_from_George"}
        }),
        new StudentConfiguration({
          name: "Edward",
          consumingObservables: {homework: "homework_from_jack", tuition: "tuition_amount_from_George"}
        }),
        new StudentConfiguration({
          name: "Frank",
          consumingObservables: {homework: "homework_from_jack", tuition: "tuition_amount_from_George"}
        }),
      ]
    }),
  ]
})`
}
