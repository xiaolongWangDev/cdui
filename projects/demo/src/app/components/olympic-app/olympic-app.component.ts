import {ConfigurationDrivenComponent, DynamicObservableOrchestrationService} from "configuration-driven-core";
import {ChangeDetectorRef, Component} from "@angular/core";
import {combineLatest, Observable} from "rxjs";
import {MockApiService} from "../../service/mock-api.service";
import {OlympicAppConfig} from "./olympic-app.config";
import {mergeMap} from "rxjs/operators";


@Component({
  selector: "demo-olympic-app",
  template: `
    <div *ngFor="let childConfig of config.components">
      <ng-template [cdDynamic]="childConfig"></ng-template>
    </div>
  `
})
export class OlympicAppComponent extends ConfigurationDrivenComponent<OlympicAppConfig> {

  constructor(private mockApiService: MockApiService, obsService: DynamicObservableOrchestrationService, changeDetectionRef: ChangeDetectorRef) {
    super(obsService, changeDetectionRef);
  }

  protected yieldObservablesFactories(): Record<string, () => Observable<any>> {
    const tableColDefObsId = this.config.yieldingObservables.tableColDef.observableId;
    const medalColumnOptionsObsId = this.config.yieldingObservables.medalColumnOptions.observableId;
    const numericColumnOptionsObsId = this.config.yieldingObservables.numericColumnOptions.observableId;
    const pivotColumnOptionsObsId = this.config.yieldingObservables.pivotColumnOptions.observableId;
    const athleteOptionsObsId = this.config.yieldingObservables.athleteOptions.observableId;
    const countryOptionsObsId = this.config.yieldingObservables.countryOptions.observableId;
    const sportOptionsObsId = this.config.yieldingObservables.sportOptions.observableId;
    const filterObsId = this.config.yieldingObservables.filters.observableId;
    const tableDataObsId = this.config.yieldingObservables.tableData.observableId;
    const splineDataObsId = this.config.yieldingObservables.splineData.observableId;
    const heatMapDataObsId = this.config.yieldingObservables.heatMapData.observableId;
    const scatterDataObsId = this.config.yieldingObservables.scatterData.observableId;
    return {
      [tableColDefObsId]: () => this.mockApiService.getOlympicDataMeta(),
      [medalColumnOptionsObsId]: ()=> this.mockApiService.getMedalColumns(),
      [pivotColumnOptionsObsId]: ()=> this.mockApiService.getPivotColumns(),
      [numericColumnOptionsObsId]: ()=> this.mockApiService.getNumericColumns(),
      [athleteOptionsObsId]: () => this.mockApiService.getAthletes(),
      [countryOptionsObsId]: () => this.mockApiService.getCountries(),
      [sportOptionsObsId]: () => this.mockApiService.getSports(),
      [filterObsId]: () => {
        const selectedAthleteObsId = this.config.yieldingObservables.filters.dependsOn.selectedAthlete;
        const selectedCountryObsId = this.config.yieldingObservables.filters.dependsOn.selectedCountry;
        const selectedSportObsId = this.config.yieldingObservables.filters.dependsOn.selectedSport;
        return combineLatest([this.obsService.getObservable(selectedAthleteObsId),
          this.obsService.getObservable(selectedCountryObsId),
          this.obsService.getObservable(selectedSportObsId)])
      },
      [tableDataObsId]: () => {
        return this.obsService.getObservable(filterObsId).pipe(
          mergeMap(filter => this.mockApiService.getOlympicData(filter))
        );
      },
      [splineDataObsId]: ()=> null,
      [heatMapDataObsId]: ()=> null,
      [scatterDataObsId]: ()=> null,
    }
  }
}
