import {ComponentConfiguration} from "configuration-driven-core";
import {OlympicAppComponent} from "./olympic-app.component";

export class OlympicAppConfig extends ComponentConfiguration<OlympicAppComponent,
  {
    filters: ["selectedAthlete", "selectedCountry", "selectedSport"],
    athleteOptions: [],
    countryOptions: [],
    sportOptions: [],
    tableData: ["filters"],
    splineData: ["filters", "selectedResultColumn"],
    heatMapData: ["filters", "selectedResultColumn", "selectedPivotColumn"],
    scatterData: ["filters", "selectedResultColumn", "selectedNumericColumn"],
  },
  []> {
  constructor(args: Omit<OlympicAppConfig, "componentType">) {
    super();
    const config = {

    }
    Object.assign(this, {...args, componentType: OlympicAppComponent});
  }
}
