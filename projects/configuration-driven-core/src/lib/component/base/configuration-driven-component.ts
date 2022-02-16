import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from "@angular/core";
import {AnyComponentConfiguration} from "../../model/types";
import {BehaviorSubject, Subject} from "rxjs";
import {DynamicObservableOrchestrationService} from "../../service/tracked-object-orchestration.service";
import {markAsTracked, setNullAttributes} from "../../Helper";

@Component({template: ``})
export abstract class ConfigurationDrivenComponent<CONF_TYPE extends AnyComponentConfiguration> implements OnInit, OnDestroy {
  @Input() config: CONF_TYPE;
  obsReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  protected readonly destroy$: Subject<void> = new Subject<void>();

  constructor(protected obsService?: DynamicObservableOrchestrationService,
              protected changeDetectionRef?: ChangeDetectorRef) {
  }

  ngOnInit() {
    markAsTracked(this.obsReady$, "obs_ready_" + this.getComponentIdentity() || this.constructor.name);

    if (this.config.consumingObservables && (!this.obsService || !this.changeDetectionRef)) {
      throw new Error("Programmer Error: if you are consuming observables, " +
        "you need to inject DynamicObservableOrchestrationService and ChangeDetectorRef and pass them to ConfigurationDrivenComponent");
    }
    if (this.config.consumingObservables) {
      this.obsService.waitFor(Object.values(this.config.consumingObservables), () => {
        this.readyToConsumeObservables();
        this.obsReady$.next(true);
        this.changeDetectionRef.detectChanges();
      })
    }
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


  protected readyToConsumeObservables() {
  }

  protected getComponentIdentity(): string {
    return this.config.id
  }

  protected destroyExtra(): void {
  }
}
