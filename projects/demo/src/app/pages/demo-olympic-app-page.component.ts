import {Component} from '@angular/core';
import {PlaceholderConfig} from "../components/placeholder/placeholder.config";
import {PageConfiguration} from "../components/page/page.config";
import {StoreConfiguration} from "configuration-driven-core";
import {DropdownConfiguration} from "../components/dropdown/dropdown.config";
import {RowConfiguration} from "../components/row/row.config";
import {AlertConfiguration} from "../components/alert/alert.config";
import {standard_page_template} from "../components/page/page.component";
import {OlympicAppConfig} from "../components/olympic-app/olympic-app.config";
import {TypeaheadConfiguration} from "../components/typeahead/typeahead.config";
import {TabConfiguration} from "../components/tab/tab.config";
import {TableConfiguration} from "../components/table/table.config";
import {BlockConfiguration} from "../components/block/block.config";

@Component({
  template: standard_page_template
})
export class DemoOlympicAppPageComponent {
  config = demo_olympic_app_conf;
}

const demo_olympic_app_conf = new PageConfiguration({
  title: "Olympic App",
  components: [
    new AlertConfiguration({
      type: "success",
      htmlContent: `<p>Time to put all together and see what we can build with CD framework</p>`
    }),
    new OlympicAppConfig({
      store: new StoreConfiguration({
        states: {
          selected_athlete: null,
          selected_country: null,
          selected_sport: null,
          selected_medal_column: null,
          selected_pivot_column: null,
          selected_numeric_column: null
        }
      }),
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
            selectedNumericColumn: "selected_numeric_column"
          }
        }
      },
      components: [
        new RowConfiguration({
          colWidth: [1, 4, 3, 4],
          components: [
            new PlaceholderConfig({
              text: "Filters:",
              textOnly: true
            }),
            new TypeaheadConfiguration({
              label: "Athlete",
              optionsObservable: "athlete_options",
              selectionObservable: "selected_athlete",
              keepInStore: true
            }),
            new TypeaheadConfiguration({
              label: "Country",
              optionsObservable: "country_options",
              selectionObservable: "selected_country",
              keepInStore: true
            }),
            new TypeaheadConfiguration({
              label: "Sport",
              optionsObservable: "sport_options",
              selectionObservable: "selected_sport",
              keepInStore: true
            })]
        }),
        new TabConfiguration({
          tabLabels: ["Overview", "Table"],
          components: [
            new BlockConfiguration({
              components: [
                new RowConfiguration({
                  colWidth: [1, 3, 3, 3],
                  components: [
                    new PlaceholderConfig({
                      text: "Controls:",
                      textOnly: true
                    }),
                    new DropdownConfiguration({
                      label: "Medal",
                      optionsObservable: "medal_column_options",
                      selectionObservable: "selected_medal_column",
                      keepInStore: true
                    }),
                    new DropdownConfiguration({
                      label: "Pivot",
                      optionsObservable: "pivot_column_options",
                      selectionObservable: "selected_pivot_column",
                      keepInStore: true
                    }),
                    new DropdownConfiguration({
                      label: "Numeric",
                      optionsObservable: "numeric_column_options",
                      selectionObservable: "selected_numeric_column",
                      keepInStore: true
                    }),
                  ]
                })
              ]
            }),
            new TableConfiguration({
              consumingObservables: {rowData: "table_data", columnDefs: "table_col_def"}
            })
          ]
        })
      ]
    })]
});



