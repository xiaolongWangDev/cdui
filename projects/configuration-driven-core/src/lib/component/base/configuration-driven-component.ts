import {AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from "@angular/core";
import {AnyComponentConfiguration} from "../../model/types";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {markAsTracked, setNullAttributes} from "../../Helper";
import {takeUntil} from "rxjs/operators";
import {DynamicObservableOrchestrationService} from "../../service/dynamic-observable-orchestration.service";

@Component({template: ``})
export abstract class ConfigurationDrivenComponent<CONF_TYPE extends AnyComponentConfiguration> implements OnInit, AfterViewInit, OnDestroy {
  /**
   *  The configuration model that's driving the component
   */
  @Input() config: CONF_TYPE;
  /**
   *  Indicates whether the component is ready to render the part of the template that's relying on other public
   *  observables which are to be consumed from the outside.
   *  only set when the component consumes observables
   */
  obsReady$: BehaviorSubject<boolean>;
  /**
   * Indicates the component is destroyed. This is the common practice to unsubscribe in bulk.
   */
  protected destroy$: Subject<void>;
  /**
   * Contains IDs of the observables that are supposed to be kept in a store instead of locally.
   */
  protected keepInStore: Set<string>;

  /**
   * Both all optional. Simple/Boring components don't need to set them.
   * If the component yields or consumes public observables, it needs obsService.
   * If the component consumes public observables, it needs changeDetectionRef
   */
  constructor(protected obsService?: DynamicObservableOrchestrationService,
              protected changeDetectionRef?: ChangeDetectorRef) {
  }

  // config object only becomes available in and after ngOnInit
  ngOnInit() {
    this.destroy$ = markAsTracked(new Subject<void>(), "destroy_" + this.getComponentIdentity());
    // create the set from string array that's on the configuration model or empty if nothing is set
    this.keepInStore = this.config.keepInStore ? new Set<string>(this.config.keepInStore) : new Set<string>();

    // programmer oriented errors
    if (this.config.consumingObservables && (!this.obsService || !this.changeDetectionRef)) {
      throw new Error("Programmer Error: if you are consuming observables, " +
        "you need to inject DynamicObservableOrchestrationService and ChangeDetectorRef and pass them to ConfigurationDrivenComponent");
    }
    if (this.config.store && !this.obsService) {
      throw new Error("Programmer Error: if you enabled the store, " +
        "you need to inject DynamicObservableOrchestrationService and pass it to ConfigurationDrivenComponent");
    }

    // if the component consumes, it'll tell obsService that it's waiting for the observables.
    // the obsService will run the callback as soon as those observables become available
    if (this.config.consumingObservables) {
      this.obsReady$ = markAsTracked(new BehaviorSubject<boolean>(false), "obs_ready_" + this.getComponentIdentity());
      this.obsService.waitFor(Object.values(this.config.consumingObservables), () => {
        // This is to be implemented by child component. they can choose whatever way to use these observables
        this.readyToConsumeObservables();
        // set obsReady$ to true, so the interesting part of the page can be shown
        // (because data are coming in through observables)
        this.obsReady$.next(true);

        // sometimes the view doesn't render on its own
        this.changeDetectionRef.detectChanges();
      })
    }

    // if this component enabled the store, register the state behavior subjects
    if (this.config.store) {
      for (const [observableId, initialValue] of Object.entries(this.config.store.states)) {
        this.obsService.addObservable(observableId, markAsTracked(new BehaviorSubject<any>(initialValue), "store_entry_" + observableId));
      }
    }
  }

  // dom ref only becomes available after ngAfterViewInit
  ngAfterViewInit(): void {
    this.yieldObservables();
  }

  ngOnDestroy(): void {
    // trigger the signal for all unsubscription
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

    // if yielded observables, revoke them from DynamicObservableOrchestrationService
    if (this.config.yieldingObservables) {
      for (const val of Object.values(this.config.yieldingObservables)) {
        const observableId = val.observableId;
        if (!this.keepInStore.has(observableId)) {
          this.obsService.revokeObservable(observableId);
        }
      }
    }

    // if I host a store, revoke the behavior subjects from DynamicObservableOrchestrationService
    if (this.config.store) {
      for (const observableId of Object.keys(this.config.store.states)) {
        this.obsService.revokeObservable(observableId);
      }
    }

    // anything custom will run here
    this.destroyExtra();

    // this is to counter a devtool + angular bug that keeps destroyed components in ng-context
    setNullAttributes(this);
  }

  /**
   * need to be overridden by any component that consumes observables.
   * user can assign, pipe from the public observables just consumed to member attributes
   * so that they can be used in the component/template
   */
  protected readyToConsumeObservables(): void {
  }

  /**
   * need to be overridden by any component that yields observables.
   * user needs to create a map of factories that create observables with observable IDs being the keys.
   */
  protected yieldObservablesFactories(): Record<string, () => Observable<any>> {
    throw new Error("Programmer Error: you need to override yieldObservablesFactories() and return the observable factories");
  }

  /**
   * in some circumstances, it's ideal to make a component instance more identifiable.
   * we could either use the config.id field via configuration, or use something totally different by override this method
   * Note that, config.id is not a required field, so the default identity is the name of the class, therefore, won't be unique.
   */
  protected getComponentIdentity(): string {
    return this.config.id || this.constructor.name
  }

  /**
   * any extra resources need to be released, works need to be wrapped up can be done here.
   */
  protected destroyExtra(): void {
  }

  /**
   * should only be called after the view is initialized
   * in case some of our observables need to derive from DOM elements
   */
  private yieldObservables(): void {
    if (this.config.yieldingObservables && !this.obsService) {
      throw new Error("Programmer Error: if you are yielding observables, you need to inject DynamicObservableOrchestrationService and pass it to ConfigurationDrivenComponent");
    }

    if (this.config.yieldingObservables) {
      // because all the view and dom's are rendered. So any observable deriving from them should/can be created
      const factories = this.yieldObservablesFactories();
      // for each observable to yield
      for (const val of Object.values(this.config.yieldingObservables)) {
        let observableId = val.observableId;
        let dependencies = Object.values(val.dependsOn || {});
        // wait for the dependency observables
        this.obsService.waitFor(dependencies, () => {
          // now that the dependencies are ready, call the factory to gen the observable
          const observable: Observable<any> = factories[observableId]();
          // if it's marked to be kept in a store
          if (this.keepInStore.has(observableId)) {
            // instead of registering directly,
            // wait for the placeholder behavior subject to be registered by the store
            this.obsService.waitFor([observableId], () => {
              const subjectInStore = this.obsService.getBehaviorSubject(observableId);
              // subscribe the local observable and write any emission to the behavior subject
              observable
                // this takeUntil guarantees all the observables subscribed will be unsubscribed
                // at the end of the component life cycle
                .pipe(takeUntil(this.destroy$))
                .subscribe(o => subjectInStore.next(o))
            })
          } else {
            // otherwise, just register directly to DynamicObservableOrchestrationService
            this.obsService.addObservable(observableId, observable);
          }
        });
      }
    }
  }
}
