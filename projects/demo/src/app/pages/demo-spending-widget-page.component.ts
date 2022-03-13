import {Component} from '@angular/core';
import {SpendingWidgetConfig} from "../components/spending-widget/spending-widget.config";
import {AlertConfiguration} from "../components/alert/alert.config";
import {BlockConfiguration} from "../components/block/block.config";
import {ConstructionService} from "configuration-driven-core";

@Component({
  template: `
    <div class="mt-2 ml-5 mr-5 mb-2">
      <h1>Widget</h1>
      <demo-toggle>
        <ng-template demo-toggle-target>
          <demo-block [config]="config"></demo-block>
          <hr>
          <code-card [code]="configCode"></code-card>
          <code-card [code]="configModelCode"></code-card>
        </ng-template>
      </demo-toggle>
    </div>
  `
})
export class DemoSpendingWidgetPageComponent {
  raw: any;
  config: BlockConfiguration;
  configCode: string;

  constructor(private constructionService: ConstructionService) {
    this.raw = {
      _type: "BlockConfiguration",
      components: [
        {
          _type: "AlertConfiguration",
          type: "success",
          htmlContent: `
<p>The page demos the use of self-contained widget components.</p>
<p>The component does not rely on external observables. As a result, it requires zero configuration from the outside.
This is how we'd keep the configuration manageable - By creating self-contained widget units, redundant configuration details
can be hidden from the end programmer/configurator.
</p>
<p>Inside, it still uses configuration driven components and wire them together by observables.</p>
<p>In this example, the SpendingWidgetComponent consists of a ControlBarComponent and a SpendingHeatMapComponent.</p>
<p>The SpendingHeatMapComponent itself shows how easy it is to extend existing CD component and add new features.
</p>
<p>
A very brief note on the data flow: mock api service -> dropdown options -> dropdown selections -> mock api service -> heatmap data
</p>
<p>You probably noticed short delays when the dropdown and the heatmap is populating.
 This is set up intentional in the mock data service to mimic retrieving data from a server. </p>
`
        },
        {
          _type: "SpendingWidgetConfig"
        }]
    }
    this.config = constructionService.constructFrom(this.raw)
    this.configCode = JSON.stringify(this.raw, null, "  ")
  }


  configModelCode =
    `export class SpendingWidgetConfig extends ComponentConfiguration<SpendingWidgetComponent> {
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
}`
}

// const demo_spending_widget_conf = new BlockConfiguration({
//   components: [
//     new AlertConfiguration({
//       type: "success",
//       htmlContent: `
// <p>The page demos the use of self-contained widget components.</p>
// <p>The component does not rely on external observables. As a result, it requires zero configuration from the outside.
// This is how we'd keep the configuration manageable - By creating self-contained widget units, redundant configuration details
// can be hidden from the end programmer/configurator.
// </p>
// <p>Inside, it still uses configuration driven components and wire them together by observables.</p>
// <p>In this example, the SpendingWidgetComponent consists of a ControlBarComponent and a SpendingHeatMapComponent.</p>
// <p>The SpendingHeatMapComponent itself shows how easy it is to extend existing CD component and add new features.
// </p>
// <p>
// A very brief note on the data flow: mock api service -> dropdown options -> dropdown selections -> mock api service -> heatmap data
// </p>
// <p>You probably noticed short delays when the dropdown and the heatmap is populating.
//  This is set up intentional in the mock data service to mimic retrieving data from a server. </p>
// `
//     }),
//     new SpendingWidgetConfig()]
// });



