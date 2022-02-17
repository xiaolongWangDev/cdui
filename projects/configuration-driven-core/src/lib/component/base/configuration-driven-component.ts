import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from "@angular/core";
import {AnyComponentConfiguration} from "../../model/types";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {DynamicObservableOrchestrationService} from "../../service/tracked-object-orchestration.service";
import {markAsTracked, setNullAttributes} from "../../Helper";
import {takeUntil} from "rxjs/operators";

@Component({template: ``})
export abstract class ConfigurationDrivenComponent<CONF_TYPE extends AnyComponentConfiguration> implements OnInit, OnDestroy {
  @Input() config: CONF_TYPE;
  obsReady$: BehaviorSubject<boolean>;
  protected readonly destroy$: Subject<void> = new Subject<void>();
  protected keepInStore: Set<string>;

  constructor(protected obsService?: DynamicObservableOrchestrationService,
              protected changeDetectionRef?: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.keepInStore = this.config.keepInStore ? new Set<string>(this.config.keepInStore) : new Set<string>();
    if (this.config.consumingObservables) {
      this.obsReady$ = markAsTracked(new BehaviorSubject<boolean>(false), "obs_ready_" + (this.getComponentIdentity() || this.constructor.name));
    }

    if (this.config.consumingObservables && (!this.obsService || !this.changeDetectionRef)) {
      throw new Error("Programmer Error: if you are consuming observables, " +
        "you need to inject DynamicObservableOrchestrationService and ChangeDetectorRef and pass them to ConfigurationDrivenComponent");
    }
    if (this.config.store && !this.obsService) {
      throw new Error("Programmer Error: if you enabled the store, " +
        "you need to inject DynamicObservableOrchestrationService and pass it to ConfigurationDrivenComponent");
    }

    if (this.config.consumingObservables) {
      this.obsService.waitFor(Object.values(this.config.consumingObservables), () => {
        this.readyToConsumeObservables();
        this.obsReady$.next(true);
        this.changeDetectionRef.detectChanges();
      })
    }
    if (this.config.store) {
      for (const [observableId, initialValue] of Object.entries(this.config.store.states)) {
        this.obsService.addObservable(observableId, markAsTracked(new BehaviorSubject<any>(initialValue), "store_entry_" + observableId));
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.config.yieldingObservables && !this.obsService) {
      throw new Error("Programmer Error: if you are yielding observables, you need to inject DynamicObservableOrchestrationService and pass it to ConfigurationDrivenComponent");
    }

    if (this.config.yieldingObservables) {
      const observablesToYield = this.readyToYieldObservables();
      for (const val of Object.values(this.config.yieldingObservables)) {
        const observableId = val as string;
        const observable: Observable<any> = observablesToYield[observableId];
        if (this.keepInStore.has(observableId)) {
          this.obsService.waitFor([observableId], () => {
            const subjectInStore = this.obsService.getBehaviorSubject(observableId);
            observable
              .pipe(takeUntil(this.destroy$))
              .subscribe(o => subjectInStore.next(o))
          })
        } else {
          this.obsService.addObservable(observableId, observable);
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.config.yieldingObservables && !this.obsService) {
      throw new Error("Programmer Error: if you are yielding observables, " +
        "you need to inject DynamicObservableOrchestrationService and pass it to ConfigurationDrivenComponent");
    }
    if (this.config.store && !this.obsService) {
      throw new Error("Programmer Error: if you enabled the store, " +
        "you need to inject DynamicObservableOrchestrationService and pass it to ConfigurationDrivenComponent");
    }

    if (this.config.yieldingObservables) {
      for (const val of Object.values(this.config.yieldingObservables)) {
        const observableId = val as string;
        if (!this.keepInStore.has(observableId)) {
          this.obsService.revokeObservable(observableId);
        }
      }
    }

    if (this.config.store) {
      for (const observableId of Object.keys(this.config.store.states)) {
        this.obsService.revokeObservable(observableId);
      }
    }

    this.destroyExtra();
    setNullAttributes(this);
  }


  protected readyToConsumeObservables(): void {
  }

  protected readyToYieldObservables(): Record<string, Observable<any>> {
    throw new Error("Programmer Error: you need to override readyToYieldObservables() and return the observable instances you are yielding");
  }

  protected getComponentIdentity(): string {
    return this.config.id
  }

  protected destroyExtra(): void {
  }
}
