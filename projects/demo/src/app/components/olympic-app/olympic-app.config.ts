import {AnyComponentConfiguration, ComponentConfiguration} from "configuration-driven-core";
import {OlympicAppComponent} from "./olympic-app.component";

export class OlympicAppConfig extends ComponentConfiguration<OlympicAppComponent,
  {
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
    heatMapData: ["filters", "selectedResultColumn", "selectedPivotColumn"],
    scatterData: ["filters", "selectedResultColumn", "selectedNumericColumn"],
  },
  []> {
  public readonly components: AnyComponentConfiguration[];
  constructor(args: Omit<OlympicAppConfig, "componentType">) {
    super();
    Object.assign(this, {...args, componentType: OlympicAppComponent});
  }
}
