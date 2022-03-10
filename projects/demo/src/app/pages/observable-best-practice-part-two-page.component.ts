import {Component} from '@angular/core';
import {HeadmasterConfiguration} from "../components/headmaster/headmaster.config";
import {TeacherConfiguration} from "../components/teacher/teacher.config";
import {StudentConfiguration} from "../components/student/student.config";
import {PostOfficeConfig} from "../components/post-office/post-office.config";
import {PenPalConfig} from "../components/pen-pal/pen-pal.config";
import {StoreConfiguration} from "configuration-driven-core";

@Component({
  templateUrl: "observable-best-practice-part-two-page.component.html"
})
export class ObservableBestPracticePartTwoPageComponent {
  config = observable_best_practice_part_two_page_conf;
  configCode =
`new PostOfficeConfig({
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
})`
}

const observable_best_practice_part_two_page_conf = new PostOfficeConfig({
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


