import {Component} from '@angular/core';
import {ConstructionService} from "configuration-driven-core";
import {HeadmasterConfiguration} from "./components/headmaster/headmaster.config";
import {TeacherConfiguration} from "./components/teacher/teacher.config";
import {StudentConfiguration} from "./components/student/student.config";
import {OlympicAppConfig} from "./components/olympic-app/olympic-app.config";
import {BlockConfiguration} from "./components/block/block.config";
import {AlertConfiguration} from "./components/alert/alert.config";
import {RowConfiguration} from "./components/row/row.config";
import {PlaceholderConfig} from "./components/placeholder/placeholder.config";
import {TypeaheadConfiguration} from "./components/typeahead/typeahead.config";
import {DropdownConfiguration} from "./components/dropdown/dropdown.config";
import {TabConfiguration} from "./components/tab/tab.config";
import {OlympicSplineConfig} from "./components/olympic-app/olympic-spline/olympic-spline.config";
import {TopPlayersConfig} from "./components/olympic-app/top-players/top-players.config";
import {OlympicHeatMapConfig} from "./components/olympic-app/olympic-heat-map/olympic-heat-map.config";
import {OlympicScatterPlotConfig} from "./components/olympic-app/olympic-scatter-plot/olympic-scatter-plot.config";
import {TableConfiguration} from "./components/table/table.config";
import {HeatMapConfig} from "./components/highcharts/heatmap/heat-map.config";
import {ScatterConfig} from "./components/highcharts/scatter/scatter.config";
import {SplineConfig} from "./components/highcharts/spline/spline.config";
import {SpendingWidgetConfig} from "./components/spending-widget/spending-widget.config";
import {TableDataFetcherConfig} from "./components/table-data-fetcher/table-data-fetcher.config";
import {PenPalConfig} from "./components/pen-pal/pen-pal.config";
import {PostOfficeConfig} from "./components/post-office/post-office.config";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(private constructionService: ConstructionService) {
    constructionService.registerType("HeadmasterConfiguration", args => new HeadmasterConfiguration(args))
    constructionService.registerType("TeacherConfiguration", args => new TeacherConfiguration(args))
    constructionService.registerType("StudentConfiguration", args => new StudentConfiguration(args))
    constructionService.registerType("PenPalConfig", args => new PenPalConfig(args))
    constructionService.registerType("PostOfficeConfig", args => new PostOfficeConfig(args))
    constructionService.registerType("OlympicAppConfig", args => new OlympicAppConfig(args))
    constructionService.registerType("BlockConfiguration", args => new BlockConfiguration(args))
    constructionService.registerType("AlertConfiguration", args => new AlertConfiguration(args))
    constructionService.registerType("RowConfiguration", args => new RowConfiguration(args))
    constructionService.registerType("PlaceholderConfig", args => new PlaceholderConfig(args))
    constructionService.registerType("TypeaheadConfiguration", args => new TypeaheadConfiguration(args))
    constructionService.registerType("TabConfiguration", args => new TabConfiguration(args))
    constructionService.registerType("DropdownConfiguration", args => new DropdownConfiguration(args))
    constructionService.registerType("OlympicSplineConfig", args => new OlympicSplineConfig(args))
    constructionService.registerType("TopPlayersConfig", args => new TopPlayersConfig(args))
    constructionService.registerType("OlympicHeatMapConfig", args => new OlympicHeatMapConfig(args))
    constructionService.registerType("OlympicScatterPlotConfig", args => new OlympicScatterPlotConfig(args))
    constructionService.registerType("TableConfiguration", args => new TableConfiguration(args))
    constructionService.registerType("HeatMapConfig", args => new HeatMapConfig(args))
    constructionService.registerType("ScatterConfig", args => new ScatterConfig(args))
    constructionService.registerType("SplineConfig", args => new SplineConfig(args))
    constructionService.registerType("SpendingWidgetConfig", _ => new SpendingWidgetConfig())
    constructionService.registerType("TableDataFetcherConfig", args => new TableDataFetcherConfig(args))
  }
}
