import {
  ConfigurationDrivenComponent,
  DynamicObservableOrchestrationService,
  markAsTracked
} from "configuration-driven-core";
import {ChangeDetectorRef, Component} from "@angular/core";
import {combineLatest, Observable} from "rxjs";
import {MockApiService} from "../../service/mock-api.service";
import {OlympicAppConfig, SetFilter} from "./olympic-app.config";
import {distinctUntilChanged, mergeMap, takeUntil} from "rxjs/operators";


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

  protected setLocalData(): void {
    this.obsService.getBehaviorSubject(this.config.consumingObservables.setFilterEvent)
      .pipe(takeUntil(this.destroy$)).subscribe((event: SetFilter) => {
      if (event) {
        // if a filter is set from a chart, we'll first apply that filter
        if (event.filterType === "athlete") {
          this.obsService.getBehaviorSubject(this.config.consumingObservables.selectedAthlete).next(event.filterValue);
        } else if (event.filterType === "country") {
          this.obsService.getBehaviorSubject(this.config.consumingObservables.selectedCountry).next(event.filterValue);
        } else if (event.filterType === "sport") {
          this.obsService.getBehaviorSubject(this.config.consumingObservables.selectedSport).next(event.filterValue);
        }
        // then go to the table tab
        this.obsService.getBehaviorSubject(this.config.consumingObservables.activeTab).next(2);
      }
    })
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
    const topPlayerDataObsId = this.config.yieldingObservables.topPlayerData.observableId;
    const heatMapDataObsId = this.config.yieldingObservables.heatMapData.observableId;
    const scatterDataObsId = this.config.yieldingObservables.scatterData.observableId;
    return {
      [tableColDefObsId]: () => markAsTracked(this.mockApiService.getOlympicDataMeta(), tableColDefObsId),
      [medalColumnOptionsObsId]: () => markAsTracked(this.mockApiService.getMedalColumns(), medalColumnOptionsObsId),
      [pivotColumnOptionsObsId]: () => markAsTracked(this.mockApiService.getPivotColumns(), pivotColumnOptionsObsId),
      [numericColumnOptionsObsId]: () => markAsTracked(this.mockApiService.getNumericColumns(), numericColumnOptionsObsId),
      [athleteOptionsObsId]: () => markAsTracked(this.mockApiService.getAthletes(), athleteOptionsObsId),
      [countryOptionsObsId]: () => markAsTracked(this.mockApiService.getCountries(), countryOptionsObsId),
      [sportOptionsObsId]: () => markAsTracked(this.mockApiService.getSports(), sportOptionsObsId),
      [filterObsId]: () => {
        const selectedAthleteObsId = this.config.yieldingObservables.filters.dependsOn.selectedAthlete;
        const selectedCountryObsId = this.config.yieldingObservables.filters.dependsOn.selectedCountry;
        const selectedSportObsId = this.config.yieldingObservables.filters.dependsOn.selectedSport;
        return markAsTracked(combineLatest([this.obsService.getObservable(selectedAthleteObsId),
            this.obsService.getObservable(selectedCountryObsId),
            this.obsService.getObservable(selectedSportObsId)])
            .pipe(
              distinctUntilChanged((prev, cur) =>
                prev[0] === cur[0]
                && prev[1] === cur[1]
                && prev[2] === cur[2])),
          filterObsId)
      },
      [tableDataObsId]: () => {
        return markAsTracked(this.obsService.getObservable(filterObsId).pipe(
          mergeMap(filter => this.mockApiService.getOlympicData(filter))
        ), tableDataObsId)
      },
      [splineDataObsId]: () => {
        const selectedResultColumnObsId = this.config.yieldingObservables.splineData.dependsOn.selectedResultColumn;
        return markAsTracked(combineLatest([
          this.obsService.getObservable(filterObsId),
          this.obsService.getObservable(selectedResultColumnObsId)
        ]).pipe(
          mergeMap((args) =>
            this.mockApiService.getMedalByDate(...args)),
        ), splineDataObsId)
      },
      [topPlayerDataObsId]: () => {
        return markAsTracked(this.obsService.getObservable(filterObsId).pipe(
            mergeMap((filter) => this.mockApiService.getPerPlayerCounts(filter))),
          topPlayerDataObsId)
      },
      [heatMapDataObsId]: () => {
        const selectedResultColumnObsId = this.config.yieldingObservables.heatMapData.dependsOn.selectedResultColumn;
        const selectedPivotColumnObsId = this.config.yieldingObservables.heatMapData.dependsOn.selectedPivotColumn;
        return markAsTracked(combineLatest([
          this.obsService.getObservable(filterObsId),
          this.obsService.getObservable(selectedResultColumnObsId),
          this.obsService.getObservable(selectedPivotColumnObsId)
        ]).pipe(
          mergeMap((args) =>
            this.mockApiService.getMedalByYearAndPivot(...args)),
        ), heatMapDataObsId)
      },
      [scatterDataObsId]: () => {
        const selectedResultColumnObsId = this.config.yieldingObservables.scatterData.dependsOn.selectedResultColumn;
        const selectedNumericColumnObsId = this.config.yieldingObservables.scatterData.dependsOn.selectedNumericColumn;
        const selectedPivotColumnObsId = this.config.yieldingObservables.scatterData.dependsOn.selectedPivotColumn;
        return markAsTracked(combineLatest([
          this.obsService.getObservable(filterObsId),
          this.obsService.getObservable(selectedResultColumnObsId),
          this.obsService.getObservable(selectedNumericColumnObsId),
          this.obsService.getObservable(selectedPivotColumnObsId)
        ]).pipe(
          mergeMap((args) =>
            this.mockApiService.getMedalAndNumberPerPivot(...args)),
        ), scatterDataObsId)
      },
    }
  }
}
