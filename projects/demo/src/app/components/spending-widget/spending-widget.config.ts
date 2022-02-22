import {ComponentConfiguration} from "configuration-driven-core";
import {SpendingWidgetComponent} from "./spending-widget.component";
import {SpendingHeatMapConfig} from "../spending-heat-map/spending-heat-map.config";
import { ControlBarConfig } from "../control-bar/control-bar.config";

export class SpendingWidgetConfig extends ComponentConfiguration<SpendingWidgetComponent, { heatMapData: string }, { [P in 'xAxis' | 'yAxis']: string }> {
  public readonly controlBar: ControlBarConfig;
  public readonly heatMap: SpendingHeatMapConfig;

  constructor(args: Omit<SpendingWidgetConfig, "componentType">) {
    super();
    Object.assign(this, {...args, componentType: SpendingWidgetComponent});
  }
}
