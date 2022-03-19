import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {ConstructionService} from "configuration-driven-core";
import {olympic_app_raw_config} from "./demo-olympic-app-page.component";
import {OlympicAppConfig} from "../components/olympic-app/olympic-app.config";

@Component({
  template: `
    <div class="mt-2 ml-5 mr-5 mb-2">
      <h1>Live Edit Demo</h1>
      <demo-json-editor [configCode]="rootConfig" (configCodeChange)="handleConfigChange($event)"></demo-json-editor>
      <div [cdDynamic]="constructedRootConfig" *ngIf="constructedRootConfig"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JsonLiveEditPageComponent {
  rootConfig: any = olympic_app_raw_config
  constructedRootConfig: OlympicAppConfig

  constructor(private readonly constructionService: ConstructionService,
              private readonly changeDetectorRef:ChangeDetectorRef) {
  }

  handleConfigChange(newConfig: any) {
    this.constructedRootConfig = null
    this.changeDetectorRef.detectChanges();
    if (newConfig && newConfig._type) {
      this.constructedRootConfig = this.constructionService.constructFrom(newConfig)
      this.changeDetectorRef.detectChanges();
    }
  }
}


