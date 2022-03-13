import {Component} from '@angular/core';
import {PostOfficeConfig} from "../components/post-office/post-office.config";
import {PenPalConfig} from "../components/pen-pal/pen-pal.config";
import {ConstructionService} from "configuration-driven-core";

@Component({
  templateUrl: "observable-best-practice-part-two-page.component.html"
})
export class ObservableBestPracticePartTwoPageComponent {
  raw: any;
  config: PostOfficeConfig;
  configCode: string;

  constructor(private constructionService: ConstructionService) {
    this.raw = {
      _type: "PostOfficeConfig",
      palA: {
        _type: "PenPalConfig",
        name: "Alice",
        yieldingObservables: {
          sendOut: {
            observableId: "alice_mail"
          },
        },
        keepInStore: ["alice_mail"],
        consumingObservables: {
          receive: "bob_mail"
        }
      },
      palB: {
        _type: "PenPalConfig",
        name: "Bob",
        yieldingObservables: {
          sendOut: {
            observableId: "bob_mail"
          },
        },
        keepInStore: ["bob_mail"],
        consumingObservables: {
          receive: "alice_mail"
        }
      },
      store: {
        states: {"alice_mail": "", "bob_mail": ""}
      }
    }

    this.config = constructionService.constructFrom(this.raw)
    this.configCode = JSON.stringify(this.raw, null, "  ")
  }
}

