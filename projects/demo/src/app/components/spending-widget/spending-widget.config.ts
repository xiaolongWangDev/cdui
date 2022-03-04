import {ComponentConfiguration, ConsumeType, StoreConfiguration, YieldType} from "configuration-driven-core";
import {SpendingWidgetComponent} from "./spending-widget.component";
import {SpendingHeatMapConfig} from "../spending-heat-map/spending-heat-map.config";
import {ControlBarConfig} from "../control-bar/control-bar.config";
import {DropdownConfiguration} from "../dropdown/dropdown.config";

export class SpendingWidgetConfig extends ComponentConfiguration<SpendingWidgetComponent> {
  public readonly controlBar: ControlBarConfig;
  public readonly heatMap: SpendingHeatMapConfig;
  public readonly consumingObservables: ConsumeType<['xAxis', 'yAxis']>;
  public readonly yieldingObservables: YieldType<{ xDropdownOptions: [], yDropdownOptions: [], heatMapData: [] }>;

  constructor() {
    super();
    Object.assign(this, {...DEFAULT_CONFIG_TEMPLATE, componentType: SpendingWidgetComponent});
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
      optionsObservable: SPENDING_X_DROPDOWN_OPTIONS,
      selectionObservable: SPENDING_X_AXIS,
      keepInStore: true
    }),
    yAxisColumnsDropdownConfig: new DropdownConfiguration({
      label: "on y axis:",
      optionsObservable: SPENDING_Y_DROPDOWN_OPTIONS,
      selectionObservable: SPENDING_Y_AXIS,
      keepInStore: true
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
