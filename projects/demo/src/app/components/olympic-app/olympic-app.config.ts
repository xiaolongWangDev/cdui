import {
  AnyComponentConfiguration,
  ComponentConfiguration, ConsumeType,
  ExcludedAttributes,
  YieldType
} from "configuration-driven-core";
import {OlympicAppComponent} from "./olympic-app.component";

export class OlympicAppConfig extends ComponentConfiguration<OlympicAppComponent> {
  public readonly components: AnyComponentConfiguration[];
  public readonly consumingObservables: ConsumeType<[
    "setFilterEvent", "selectedAthlete", "selectedCountry", "selectedSport", "activeTab"]>;
  public readonly yieldingObservables: YieldType<{
    tableColDef: [],
    medalColumnOptions: [],
    pivotColumnOptions: [],
    numericColumnOptions: [],
    athleteOptions: [],
    countryOptions: [],
    sportOptions: [],
    filters: ["selectedAthlete", "selectedCountry", "selectedSport"],
    tableData: ["filters"],
    splineData: ["filters", "selectedResultColumn"],
    topPlayerData: ["filters"],
    heatMapData: ["filters", "selectedResultColumn", "selectedPivotColumn"],
    scatterData: ["filters", "selectedResultColumn", "selectedNumericColumn", "selectedPivotColumn"],
  }>;

  constructor(args: Omit<OlympicAppConfig, ExcludedAttributes>) {
    super();
    Object.assign(this, {...args, componentType: OlympicAppComponent});
  }
}

// event data
export type SetFilter = {
  filterType: "athlete" | "country" | "sport";
  filterValue: string;
}
