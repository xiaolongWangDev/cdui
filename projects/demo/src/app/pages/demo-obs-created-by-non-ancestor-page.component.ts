import {Component} from '@angular/core';
import {PageConfiguration} from "../components/page/page.config";
import {PostOfficeConfig} from "../components/post-office/post-office.config";
import {PenPalConfig} from "../components/pen-pal/pen-pal.config";
import {StoreConfiguration} from "configuration-driven-core";
import {AlertConfiguration} from "../components/alert/alert.config";

@Component({
  template: `
    <demo-toggle>
      <ng-template demo-toggle-target>
        <demo-page [config]="config"></demo-page>
      </ng-template>
    </demo-toggle>
  `
})
export class DemoObsCreatedByNonAncestorPageComponent {
  config = demo_obs_created_by_non_ancestor_page_conf;
}

const demo_obs_created_by_non_ancestor_page_conf = new PageConfiguration({
  title: "Configuration Driven Observable Best Practice: Part 2",
  components: [
    new AlertConfiguration({
      type: "success",
      htmlContent: `
              <p>When a component(A) want to use the observable created by another component(B) that's not one of its ancestor,
               the best practice is to host the values in a cd-store that's owned by a common ancestor(C) of A and B</p>
               <p>A cd-store is a component whose lifespan is as long as its host component.
               It creates behavior subjects and register them to the DynamicObservableOrchestrationService.
               The behavior subjects keeps the latest values the yielding observables(B) emit.
               Because it's lifespan is longer than all the children(As, Bs), we don't need to worry about the case when
               a yielding observable(B) gets destroyed while there are others(A) that are still needing its value.
               </p>
               <p>Also, in this mode, we don't register B's created observables to the DynamicObservableOrchestrationService.
               But instead, subscribe them right in the same component(B) and updating the value in the behavior subject.
               </p>
              <p>In the following example, the 2 pen pals each play both the role of A and B because they yield value and consume the value yielded by the other.
               The post office plays the role of the common ancestor(C). You can pass a store config to any config model to enable a store at that level
               </p>
              `
    }),
    new PostOfficeConfig({
      palA: new PenPalConfig({
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
      }),
      palB: new PenPalConfig({
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
      }),
      store: new StoreConfiguration({
        states: {"alice_mail": "", "bob_mail": ""}
      })
    })

  ]
});

