import {ConsumeType, ExcludedAttributes} from "configuration-driven-core";
import {OlympicHeatMapComponent} from "./olympic-heat-map.component";
import {HeatMapConfig} from "../../highcharts/heatmap/heat-map.config";

export class OlympicHeatMapConfig extends HeatMapConfig {
  public readonly height?: string = "500px"
  public readonly consumingObservables: ConsumeType<["data", "yColumn", "cellColumn", "selectedCountry", "selectedSport"]>;

  constructor(args: Omit<OlympicHeatMapConfig, ExcludedAttributes>) {
    super(args);
    Object.assign(this, {...args, componentType: OlympicHeatMapComponent});
  }
}
