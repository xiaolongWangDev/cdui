import {Component, Input, OnDestroy} from "@angular/core";
import {AnyComponentConfiguration} from "../../model/types";
import {BehaviorSubject, Subject} from "rxjs";
import {DynamicObservableOrchestrationService} from "../../service/tracked-object-orchestration.service";
import {setNullAttributes} from "../../Helper";

@Component({template: ``})
export abstract class ConfigurationDrivenComponent<CONF_TYPE extends AnyComponentConfiguration> implements OnDestroy {
  @Input() config: CONF_TYPE;
  obsReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  protected readonly destroy$: Subject<void> = new Subject<void>();

  constructor(protected obsService?: DynamicObservableOrchestrationService) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.config.yieldingObservables && !this.obsService) {
      throw new Error("Programmer Error: if you are yielding observables, you need to inject DynamicObservableOrchestrationService and pass it to ConfigurationDrivenComponent");
    }

    const keepInStore = this.config.keepInStore ? new Set(this.config.keepInStore) : new Set();
    if (this.config.yieldingObservables) {
      for (const observableId of Object.values(this.config.yieldingObservables)) {
        if (!keepInStore.has(observableId)) {
          this.obsService.revokeObservable(observableId as string);
        }
      }
    }

    this.destroyExtra();
    setNullAttributes(this);
  }

  protected destroyExtra(): void {
  }
}
