import {ConsumeType, ExcludedAttributes} from "configuration-driven-core";
import {SplineConfig} from "../../highcharts/spline/spline.config";
import {OlympicSplineComponent} from "./olympic-spline.component";

export class OlympicSplineConfig extends SplineConfig {
  public readonly height?: string = "500px"
  public readonly consumingObservables: ConsumeType<["data", "yColumn"]>;

  constructor(args: Omit<OlympicSplineConfig, ExcludedAttributes>) {
    super(args);
    Object.assign(this, {...args, componentType: OlympicSplineComponent});
  }
}
