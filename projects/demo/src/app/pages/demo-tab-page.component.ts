import {Component} from '@angular/core';
import {PlaceholderConfig} from "../components/placeholder/placeholder.config";
import {AlertConfiguration} from "../components/alert/alert.config";
import {TabConfiguration} from "../components/tab/tab.config";
import {BlockConfiguration} from "../components/block/block.config";
import {ConstructionService} from "configuration-driven-core";

@Component({
  template: `
    <div class="mt-2 ml-5 mr-5 mb-2">
      <h1>Tabs</h1>
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
export class DemoTabPageComponent {
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
        <p>Based on ng-bootstrap nav component.</p>
        <p>Each tab content should be a dynamic CD component.
        In this case, they are PlaceholderComponent.</p>
        <p>The use case here is the drive we implemented a
        better version of [cdDynamic]
        </p>`
        }, {
          _type: "TabConfiguration",
          tabLabels: ["Tab X", "Tab Y", "Tab Z"],
          components: [
            {
              _type: "PlaceholderConfig",
              text: "Foo"
            },
            {
              _type: "PlaceholderConfig",
              text: "Bar"
            },
            {
              _type: "PlaceholderConfig",
              text: "FooBar"
            }]
        }]
    }
    this.config = constructionService.constructFrom(this.raw)
    this.configCode = JSON.stringify(this.raw, null, "  ")
  }
}

// const demo_tab_conf = new BlockConfiguration({
//   components: [
//     new AlertConfiguration({
//       type: "success",
//       htmlContent: `
//         <p>Based on ng-bootstrap nav component.</p>
//         <p>Each tab content should be a dynamic CD component.
//         In this case, they are PlaceholderComponent.</p>
//         <p>The use case here is the drive we implemented a
//         better version of [cdDynamic]
//         </p>`
//     }), new TabConfiguration({
//       tabLabels: ["Tab X", "Tab Y", "Tab Z"],
//       components: [
//         new PlaceholderConfig({text: "Foo"}),
//         new PlaceholderConfig({text: "Bar"}),
//         new PlaceholderConfig({text: "FooBar"})]
//     })]
// });



