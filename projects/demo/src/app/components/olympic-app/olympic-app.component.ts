import {ConfigurationDrivenComponent, DynamicObservableOrchestrationService} from "configuration-driven-core";
import {ChangeDetectorRef, Component} from "@angular/core";
import {combineLatest, Observable} from "rxjs";
import {MockApiService} from "../../service/mock-api.service";
import {OlympicAppConfig} from "./olympic-app.config";
import {distinctUntilChanged, mergeMap, shareReplay, tap} from "rxjs/operators";


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
      [medalColumnOptionsObsId]: () => this.mockApiService.getMedalColumns(),
      [pivotColumnOptionsObsId]: () => this.mockApiService.getPivotColumns(),
      [numericColumnOptionsObsId]: () => this.mockApiService.getNumericColumns(),
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
          .pipe(
            distinctUntilChanged((prev, cur) =>
              prev[0] === cur[0]
              && prev[1] === cur[1]
              && prev[2] === cur[2]))
      },
      [tableDataObsId]: () => {
        return this.obsService.getObservable(filterObsId).pipe(
          mergeMap(filter => this.mockApiService.getOlympicData(filter))
        );
      },
      [splineDataObsId]: () => {
        const selectedResultColumnObsId = this.config.yieldingObservables.splineData.dependsOn.selectedResultColumn;
        return combineLatest([
          this.obsService.getObservable(filterObsId),
          this.obsService.getObservable(selectedResultColumnObsId)
        ]).pipe(
          mergeMap(([filter, selectedResultColumn]) =>
            this.mockApiService.getMedalByDate(filter, selectedResultColumn)),
        );
      },
      [heatMapDataObsId]: () => {
        const selectedResultColumnObsId = this.config.yieldingObservables.heatMapData.dependsOn.selectedResultColumn;
        const selectedPivotColumnObsId = this.config.yieldingObservables.heatMapData.dependsOn.selectedPivotColumn;
        return combineLatest([
          this.obsService.getObservable(filterObsId),
          this.obsService.getObservable(selectedResultColumnObsId),
          this.obsService.getObservable(selectedPivotColumnObsId)
        ]).pipe(
          mergeMap(([filter, selectedResultColumn, selectedPivotColumn]) =>
            this.mockApiService.getMedalByYearAndPivot(filter, selectedResultColumn, selectedPivotColumn)),
        );
      },
      [scatterDataObsId]: () => null,
    }
  }
}
