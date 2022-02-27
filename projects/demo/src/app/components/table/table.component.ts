import {
  ConfigurationDrivenComponent,
  DynamicObservableOrchestrationService,
  markAsTracked
} from "configuration-driven-core";
import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from "@angular/core";
import {TableConfiguration} from "./table.config";
import {BehaviorSubject, Observable} from "rxjs";
import {ColDef, RowClickedEvent} from "ag-grid-community";
import {filter} from "rxjs/operators";

@Component({
  selector: "demo-table",
  template: `
    <ag-grid-angular *ngIf="obsReady$ | async"
                     style="width: 100%; height: 500px;"
                     class="ag-theme-alpine"
                     [rowData]="rowData$ | async"
                     [columnDefs]="columnDefs$ | async"
                     [defaultColDef]="defaultColDef"
                     [pagination]="true"
                     [gridOptions]="gridOptions"
    >
    </ag-grid-angular>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent extends ConfigurationDrivenComponent<TableConfiguration> {
  readonly defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    width: 100,
  };
  readonly gridOptions;

  // from consumed
  columnDefs$: Observable<ColDef[]>;
  rowData$: Observable<Record<string, string | number>[]>;

  // for yield
  private readonly rowClickEventSubject: BehaviorSubject<RowClickedEvent> = new BehaviorSubject<RowClickedEvent>(null);

  constructor(obsService: DynamicObservableOrchestrationService, changeDetectionRef: ChangeDetectorRef) {
    super(obsService, changeDetectionRef);
    this.gridOptions = {
      onRowClicked: (event: RowClickedEvent) => this.rowClickEventSubject.next(event)
    }
  }

  readyToConsumeObservables() {
    this.columnDefs$ = this.obsService.getObservable(this.config.consumingObservables.columnDefs);
    this.rowData$ = this.obsService.getObservable(this.config.consumingObservables.rowData);
  }

  protected yieldObservablesFactories(): Record<string, () => Observable<any>> {
    return markAsTracked({
      [this.config.yieldingObservables.clickEvent.observableId]:
        () => {
          return this.rowClickEventSubject.pipe(filter(o => o !== null));
        }
    }, this.config.yieldingObservables.clickEvent.observableId)
  }
}
