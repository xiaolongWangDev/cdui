import {Component} from '@angular/core';
import {PostOfficeConfig} from "../components/post-office/post-office.config";
import {PenPalConfig} from "../components/pen-pal/pen-pal.config";
import {StoreConfiguration} from "configuration-driven-core";

@Component({
  selector: 'app-demo-introduction',
  template: `
    Introduction Page
    <demo-post-office [config]="config"></demo-post-office>
  `
})
export class IntroductionPageComponent {
  config = new PostOfficeConfig({
    palA: new PenPalConfig({
      name: "Alice",
      yieldingObservables: {
        sendOut: "alice_mail",
      },
      keepInStore: ["alice_mail"],
      consumingObservables: {
        receive: "bob_mail"
      }
    }),
    palB: new PenPalConfig({
      name: "Bob",
      yieldingObservables: {
        sendOut: "bob_mail",
      },
      keepInStore: ["bob_mail"],
      consumingObservables: {
        receive: "alice_mail"
      }
    }),
    store: new StoreConfiguration({
      states: {"alice_mail": "", "bob_mail": ""}
    })
  });
}
