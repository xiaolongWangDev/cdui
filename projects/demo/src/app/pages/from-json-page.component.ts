import {Component} from '@angular/core';
import {schoolRaw} from "./observable-best-practice-part-one-page.component";

@Component({
  templateUrl: "from-json-page.component.html"
})
export class FromJsonPageComponent {
  schoolRawCode = JSON.stringify(schoolRaw,null, "  ");
  schoolUseClassesCode =
`new HeadmasterConfiguration({
    name: "George", yieldingObservables: {
      tuition: {
        observableId: "tuition_amount_from_George"
      }
    },
    manages: [
      new TeacherConfiguration({
        name: "Tom", yieldingObservables: {
          homework: {
            observableId: "homework_from_tom"
          }
        },
        teaches: [
          new StudentConfiguration({
            name: "Alice",
            consumingObservables: {homework: "homework_from_tom", tuition: "tuition_amount_from_George"}
          }),
          new StudentConfiguration({
            name: "Bob",
            consumingObservables: {homework: "homework_from_tom", tuition: "tuition_amount_from_George"}
          }),
          new StudentConfiguration({
            name: "Charlie",
            consumingObservables: {homework: "homework_from_tom", tuition: "tuition_amount_from_George"}
          }),
        ]
      }),
      new TeacherConfiguration({
        name: "Jack", yieldingObservables: {
          homework: {
            observableId: "homework_from_jack"
          }
        },
        teaches: [
          new StudentConfiguration({
            name: "Donald",
            consumingObservables: {homework: "homework_from_jack", tuition: "tuition_amount_from_George"}
          }),
          new StudentConfiguration({
            name: "Edward",
            consumingObservables: {homework: "homework_from_jack", tuition: "tuition_amount_from_George"}
          }),
          new StudentConfiguration({
            name: "Frank",
            consumingObservables: {homework: "homework_from_jack", tuition: "tuition_amount_from_George"}
          }),
        ]
      }),
    ]
  })
`;

  registerCode =
`@Component({
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
}`
}
