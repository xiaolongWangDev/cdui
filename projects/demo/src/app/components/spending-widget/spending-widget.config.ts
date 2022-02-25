import {ComponentConfiguration, StoreConfiguration, DropdownConfiguration} from "configuration-driven-core";
import {SpendingWidgetComponent} from "./spending-widget.component";
import {SpendingHeatMapConfig} from "../spending-heat-map/spending-heat-map.config";
import {ControlBarConfig} from "../control-bar/control-bar.config";

export class SpendingWidgetConfig extends ComponentConfiguration<SpendingWidgetComponent,
  { xDropdownOptions: [], yDropdownOptions: [], heatMapData: [] }, ['xAxis' | 'yAxis']> {
  public readonly controlBar: ControlBarConfig;
  public readonly heatMap: SpendingHeatMapConfig;

  constructor(args: Omit<SpendingWidgetConfig, "componentType"> | undefined) {
    super();
    if (args === undefined) {
      Object.assign(this, {...DEFAULT_CONFIG_TEMPLATE, componentType: SpendingWidgetComponent});
    } else {
      Object.assign(this, {...args, componentType: SpendingWidgetComponent});
    }
  }
}

// observable IDs
const SPENDING_X_AXIS = "spending_x_axis";
const SPENDING_Y_AXIS = "spending_y_axis";
const SPENDING_X_DROPDOWN_OPTIONS = "spending_x_dropdown_options";
const SPENDING_Y_DROPDOWN_OPTIONS = "spending_y_dropdown_options";
const SPENDING_HEAT_MAP_DATA = "spending_heat_map_data";

const DEFAULT_CONFIG_TEMPLATE = {
  store: new StoreConfiguration({
    states: {
      [SPENDING_X_AXIS]: null,
      [SPENDING_Y_AXIS]: null
    },
  }),
  consumingObservables: {
    xAxis: SPENDING_X_AXIS,
    yAxis: SPENDING_Y_AXIS,
  },
  yieldingObservables: {
    xDropdownOptions: {observableId: SPENDING_X_DROPDOWN_OPTIONS},
    yDropdownOptions: {observableId: SPENDING_Y_DROPDOWN_OPTIONS},
    heatMapData: {observableId: SPENDING_HEAT_MAP_DATA}
  },
  controlBar: new ControlBarConfig({
    xAxisColumnsDropdownConfig: new DropdownConfiguration({
      label: "on x axis:",
      consumingObservables: {options: SPENDING_X_DROPDOWN_OPTIONS},
      yieldingObservables: {
        selection: {
          observableId: SPENDING_X_AXIS,
          dependsOn: {
            options: SPENDING_X_DROPDOWN_OPTIONS
          }
        }
      },
      keepInStore: [SPENDING_X_AXIS]
    }),
    yAxisColumnsDropdownConfig: new DropdownConfiguration({
      label: "on y axis:",
      consumingObservables: {options: SPENDING_Y_DROPDOWN_OPTIONS},
      yieldingObservables: {
        selection: {
          observableId: SPENDING_Y_AXIS,
          dependsOn: {options: SPENDING_Y_DROPDOWN_OPTIONS}
        }
      },
      keepInStore: [SPENDING_Y_AXIS]
    }),
  }),
  heatMap: new SpendingHeatMapConfig({
    title: "Spending",
    xTittle: "Time",
    yTittle: "Category",
    consumingObservables: {
      data: SPENDING_HEAT_MAP_DATA
    }
  })
}
