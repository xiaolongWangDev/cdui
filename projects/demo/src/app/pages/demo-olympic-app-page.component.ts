import {Component} from '@angular/core';
import {PlaceholderConfig} from "../components/placeholder/placeholder.config";
import {DropdownConfiguration} from "../components/dropdown/dropdown.config";
import {RowConfiguration} from "../components/row/row.config";
import {AlertConfiguration} from "../components/alert/alert.config";
import {OlympicAppConfig} from "../components/olympic-app/olympic-app.config";
import {TypeaheadConfiguration} from "../components/typeahead/typeahead.config";
import {TabConfiguration} from "../components/tab/tab.config";
import {TableConfiguration} from "../components/table/table.config";
import {BlockConfiguration} from "../components/block/block.config";
import {TopPlayersConfig} from "../components/olympic-app/top-players/top-players.config";
import {OlympicHeatMapConfig} from "../components/olympic-app/olympic-heat-map/olympic-heat-map.config";
import {OlympicScatterPlotConfig} from "../components/olympic-app/olympic-scatter-plot/olympic-scatter-plot.config";
import {OlympicSplineConfig} from "../components/olympic-app/olympic-spline/olympic-spline.config";
import {ConstructionService} from "configuration-driven-core";

@Component({
  template: `
    <div class="mt-2 ml-5 mr-5 mb-2">
      <h1>Olympic App</h1>
      <demo-toggle>
        <ng-template demo-toggle-target>
          <demo-block [config]="config"></demo-block>
          <hr>
          <code-card [code]="configCode"></code-card>
        </ng-template>
      </demo-toggle>
    </div>
  `
})
export class DemoOlympicAppPageComponent {
  raw: any;
  config: BlockConfiguration;
  configCode: string;

  constructor(private constructionService: ConstructionService) {
    this.raw = olympic_page_raw_config
    this.config = constructionService.constructFrom(this.raw)
    this.configCode = JSON.stringify(this.raw, null, "  ")
  }
}


export const olympic_app_raw_config: any = {
  _type: "OlympicAppConfig",
  store: {
    states: {
      selected_athlete: null,
      selected_country: null,
      selected_sport: null,
      selected_medal_column: null,
      selected_pivot_column: null,
      selected_numeric_column: null,
      set_filter_event: null,
      active_tab: 1
    }
  },
  consumingObservables: {
    setFilterEvent: "set_filter_event",
    selectedAthlete: "selected_athlete",
    selectedCountry: "selected_country",
    selectedSport: "selected_sport",
    activeTab: "active_tab"
  },
  yieldingObservables: {
    medalColumnOptions: {
      observableId: "medal_column_options"
    },
    pivotColumnOptions: {
      observableId: "pivot_column_options"
    },
    numericColumnOptions: {
      observableId: "numeric_column_options"
    },
    athleteOptions: {
      observableId: "athlete_options"
    },
    countryOptions: {
      observableId: "country_options"
    },
    sportOptions: {
      observableId: "sport_options"
    },
    tableColDef: {
      observableId: "table_col_def"
    },
    filters: {
      observableId: "filters",
      dependsOn: {
        selectedAthlete: "selected_athlete",
        selectedCountry: "selected_country",
        selectedSport: "selected_sport"
      }
    },
    tableData: {
      observableId: "table_data",
      dependsOn: {
        filters: "filters"
      }
    },
    splineData: {
      observableId: "spline_data",
      dependsOn: {
        filters: "filters",
        selectedResultColumn: "selected_medal_column"
      }
    },
    topPlayerData: {
      observableId: "top_player_data",
      dependsOn: {
        filters: "filters",
      }
    },
    heatMapData: {
      observableId: "heat_map_data",
      dependsOn: {
        filters: "filters",
        selectedResultColumn: "selected_medal_column",
        selectedPivotColumn: "selected_pivot_column"
      }
    },
    scatterData: {
      observableId: "scatter_data",
      dependsOn: {
        filters: "filters",
        selectedResultColumn: "selected_medal_column",
        selectedNumericColumn: "selected_numeric_column",
        selectedPivotColumn: "selected_pivot_column"
      }
    }
  },
  components: [
    {
      _type: "RowConfiguration",
      colWidth: [1, 4, 3, 4],
      components: [
        {
          _type: "PlaceholderConfig",
          text: "Filters:",
          textOnly: true
        },
        {
          _type: "TypeaheadConfiguration",
          label: "Athlete",
          optionsObservable: "athlete_options",
          selectionObservable: "selected_athlete",
          keepInStore: true,
          newSelection: "selected_athlete"
        },
        {
          _type: "TypeaheadConfiguration",
          label: "Country",
          optionsObservable: "country_options",
          selectionObservable: "selected_country",
          keepInStore: true,
          newSelection: "selected_country"
        },
        {
          _type: "TypeaheadConfiguration",
          label: "Sport",
          optionsObservable: "sport_options",
          selectionObservable: "selected_sport",
          keepInStore: true,
          newSelection: "selected_sport"
        }]
    },
    {
      _type: "TabConfiguration",
      activeTabObservable: "active_tab",
      tabLabels: ["Overview", "Table"],
      components: [
        {
          _type: "BlockConfiguration",
          components: [
            {
              _type: "RowConfiguration",
              colWidth: [1, 3, 3, 3],
              components: [
                {
                  _type: "PlaceholderConfig",
                  text: "Controls:",
                  textOnly: true
                },
                {
                  _type: "DropdownConfiguration",
                  label: "Medal",
                  optionsObservable: "medal_column_options",
                  selectionObservable: "selected_medal_column",
                  keepInStore: true
                },
                {
                  _type: "DropdownConfiguration",
                  label: "Pivot",
                  optionsObservable: "pivot_column_options",
                  selectionObservable: "selected_pivot_column",
                  keepInStore: true
                },
                {
                  _type: "DropdownConfiguration",
                  label: "Numeric",
                  optionsObservable: "numeric_column_options",
                  selectionObservable: "selected_numeric_column",
                  keepInStore: true
                },
              ]
            },
            {
              _type: "RowConfiguration",
              colWidth: [8, 4],
              components: [
                {
                  _type: "OlympicSplineConfig",
                  height: "600px",
                  consumingObservables: {
                    data: "spline_data",
                    yColumn: "selected_medal_column",
                  }
                },
                {
                  _type: "TopPlayersConfig",
                  height: "600px",
                  consumingObservables: {
                    data: "top_player_data"
                  }
                }
              ]
            },
            {
              _type: "RowConfiguration",
              colWidth: [6, 6],
              components: [
                {
                  _type: "OlympicHeatMapConfig",
                  consumingObservables: {
                    data: "heat_map_data",
                    cellColumn: "selected_medal_column",
                    yColumn: "selected_pivot_column",
                    setFilterEvent: "set_filter_event",
                  }
                },
                {
                  _type: "OlympicScatterPlotConfig",
                  consumingObservables: {
                    data: "scatter_data",
                    xColumn: "selected_numeric_column",
                    pivotColumn: "selected_pivot_column",
                    setFilterEvent: "set_filter_event",
                  }
                }
              ]
            }

          ]
        },
        {
          _type: "TableConfiguration",
          consumingObservables: {rowData: "table_data", columnDefs: "table_col_def"}
        }
      ]
    }
  ]
};

export const olympic_page_raw_config: any = {
    _type: "BlockConfiguration",
    components: [
      {
        _type: "AlertConfiguration",
        type: "success",
        htmlContent: `<p>Time to put all together and see what we can build with CD framework</p>`
      },
      olympic_app_raw_config
    ]
  }
;



