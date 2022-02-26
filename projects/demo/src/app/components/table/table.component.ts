import {ConfigurationDrivenComponent, DynamicObservableOrchestrationService} from "configuration-driven-core";
import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from "@angular/core";
import {TableConfiguration} from "./table.config";
import {Observable} from "rxjs";
import {ColDef} from "ag-grid-community";

@Component({
  selector: "demo-table",
  template: `
    <ag-grid-angular *ngIf="obsReady$ | async"
                     style="width: 100%; height: 500px;"
                     class="ag-theme-alpine"
                     [rowData]="rowData$ | async"
                     [columnDefs]="columnDefs$ | async">
    </ag-grid-angular>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent extends ConfigurationDrivenComponent<TableConfiguration> {
  columnDefs$: Observable<ColDef[]>;
  rowData$: Observable<Record<string, string | number>[]>;

  constructor(obsService: DynamicObservableOrchestrationService, changeDetectionRef: ChangeDetectorRef) {
    super(obsService, changeDetectionRef);
  }

  readyToConsumeObservables() {
    this.columnDefs$ = this.obsService.getObservable(this.config.consumingObservables.columnDefs);
    this.rowData$ = this.obsService.getObservable(this.config.consumingObservables.rowData);
  }
}
