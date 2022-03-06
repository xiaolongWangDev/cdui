import {
  ConfigurationDrivenComponent,
  DynamicObservableOrchestrationService,
  markAsTracked
} from "configuration-driven-core";
import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from "@angular/core";
import {BehaviorSubject, combineLatest, Observable, OperatorFunction} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, map, takeUntil} from "rxjs/operators";
import {TypeaheadConfiguration} from "./typeahead.config";

@Component({
  selector: "demo-typeahead",
  template: `
    <div class="input-group mb-3">
      <input *ngIf="ready$ | async" type="text" class="form-control"
             [ngClass]="{'is-invalid': (invalidInput$ | async)}"
             [placeholder]="config.label"
             [ngModel]="model$ | async"
             (ngModelChange)="model$.next($event)"
             [ngbTypeahead]="search"/>
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" (click)="model$.next(null)">Clear
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypeaheadComponent extends ConfigurationDrivenComponent<TypeaheadConfiguration> {
  model$: BehaviorSubject<string> = markAsTracked(new BehaviorSubject<string>(null), "typeahead_model");
  options$: Observable<string[]>;
  invalidInput$: Observable<boolean>;

  search: OperatorFunction<string, readonly string[]>;

  constructor(obsService: DynamicObservableOrchestrationService, changeDetectionRef: ChangeDetectorRef) {
    super(obsService, changeDetectionRef);
  }

  protected setLocalData(): void {
    this.options$ = this.obsService.getObservable(this.config.consumingObservables.options);
    this.search = (text$: Observable<string>) =>
      combineLatest([this.options$, text$]).pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map(([options, term]: [string[], string]) => term.length < 1 ? []
          : options.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
      )
    this.invalidInput$ = markAsTracked(combineLatest([this.options$, this.model$])
      .pipe(map(([options, model]) => {
        if (model) {
          return !options.includes(model)
        }
        return false;
      })), "typeahead_invalid_input_flag")

    // if configured, selection can be changed from outside
    if (this.config.consumingObservables.newSelection) {
      this.obsService.getObservable(this.config.consumingObservables.newSelection)
        .pipe(distinctUntilChanged(),
          takeUntil(this.destroy$),
          filter(newSelection => newSelection !== this.model$.getValue()))
        .subscribe(newSelection => {
          this.model$.next(newSelection)
        })

    }
  }

  protected yieldObservablesFactories(): Record<string, () => Observable<any>> {
    let selectionObservableId = this.config.yieldingObservables.selection.observableId;
    return {
      [selectionObservableId]: markAsTracked(() => combineLatest([this.options$, this.model$])
          .pipe(
            debounceTime(500),
            filter(([options, model]) => {
              return model == null || options.includes(model)
            }), map(([_, model]) => {
              return model
            }))
        , selectionObservableId)
    }
  }
}
