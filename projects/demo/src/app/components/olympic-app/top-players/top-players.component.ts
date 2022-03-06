import {ConfigurationDrivenComponent, DynamicObservableOrchestrationService} from "configuration-driven-core";
import {ChangeDetectorRef, Component} from "@angular/core";
import {TopPlayersConfig} from "./top-players.config";
import {Observable} from "rxjs";
import {PlayerData} from "../../../model/data";


@Component({
  selector: "demo-top-players",
  template: `
    <div class="card">
      <div class="card-header">
        Top Athletes
      </div>
      <ul class="list-group" *ngIf="ready$ |async">
        <li *ngFor="let row of data$ | async" class="list-group-item">
          <div class="row">
            <div class="col-6">{{row.name}}</div>
            <div class="col-2">{{row.gold}}</div>
            <div class="col-2">{{row.silver}}</div>
            <div class="col-2">{{row.bronze}}</div>
          </div>
        </li>
      </ul>
    </div>
  `
})
export class TopPlayersComponent extends ConfigurationDrivenComponent<TopPlayersConfig> {

  data$: Observable<PlayerData>;

  constructor(obsService: DynamicObservableOrchestrationService, changeDetectionRef: ChangeDetectorRef) {
    super(obsService, changeDetectionRef);
  }

  protected setLocalData(): void {
    this.data$ = this.obsService.getObservable(this.config.consumingObservables.data);
  }
}
