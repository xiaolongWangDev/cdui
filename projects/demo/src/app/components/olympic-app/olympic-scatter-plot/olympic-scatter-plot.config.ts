import {ConsumeType, ExcludedAttributes} from "configuration-driven-core";
import {ScatterConfig} from "../../highcharts/scatter/scatter.config";
import {OlympicScatterPlotComponent} from "./olympic-scatter-plot.component";


export class OlympicScatterPlotConfig extends ScatterConfig {
  public readonly height?: string = "500px"
  public readonly consumingObservables: ConsumeType<["data", "xColumn", "pivotColumn", "setFilterEvent"]>;
  constructor(args: Omit<OlympicScatterPlotConfig, ExcludedAttributes>) {
    super(args);
    Object.assign(this, {...args, componentType: OlympicScatterPlotComponent});
  }
}
