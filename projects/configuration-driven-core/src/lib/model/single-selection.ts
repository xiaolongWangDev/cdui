import {BehaviorSubject, combineLatest, Observable, of} from "rxjs";
import {map, mergeMap} from "rxjs/operators";
import {markAsTracked} from "../Helper";


function useFirstOptionAsDefault<DATA_TYPE>(options: DATA_TYPE[]): Observable<DATA_TYPE> {
  return of(options[0]);
}


export class SingleSelectModel<DATA_TYPE> {
  private readonly _selected: BehaviorSubject<DATA_TYPE> = markAsTracked(new BehaviorSubject<DATA_TYPE>(null), "dropdown_user_selected");
  public readonly selected$: Observable<DATA_TYPE>;
  public readonly selectedLabel$: Observable<string>;

  constructor(public readonly options$: Observable<DATA_TYPE[]>,
              public readonly labelMapper: (option: DATA_TYPE) => string,
              private readonly equalPredicate = (newVal: DATA_TYPE, existingVal: DATA_TYPE): boolean => newVal === existingVal,
              defaultValueProvider: (options: DATA_TYPE[]) => Observable<DATA_TYPE> = useFirstOptionAsDefault) {
    this.selected$ = markAsTracked(
      combineLatest([this._selected, this.options$]),
      "dropdown_combineLatest")
      .pipe(
        markAsTracked(
          mergeMap(([selected, options]): Observable<DATA_TYPE> => {
            let foundOption = undefined;
            if (selected !== null) {
              foundOption = options.find((o: DATA_TYPE) => equalPredicate(selected, o));
            }
            if (foundOption === undefined) {
              return defaultValueProvider(options);
            } else {
              return of(foundOption);
            }
          }),
          "dropdown_selected")
      );
    this.selectedLabel$ = markAsTracked(this.selected$.pipe(map(this.labelMapper)), "dropdown_selectedLabel");
  }

  public set selected(newSelection: DATA_TYPE) {
    if (!this.equalPredicate(newSelection, this._selected.getValue())) {
      this._selected.next(newSelection);
    }
  }
}

export class StringSingleSelectModel extends SingleSelectModel<string> {
  constructor(options$: Observable<string[]>) {
    super(options$, o => o);
  }
}
