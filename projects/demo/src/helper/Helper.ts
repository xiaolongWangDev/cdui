import {AppConfiguration} from "../app/app-configuration";
import {PageConfiguration} from "configuration-driven-core";
import {FooConfiguration} from "../app/components/foo/foo.config";
import {BarConfiguration} from "../app/components/bar/bar.config";

export const mock_config = new AppConfiguration({
    defaultLanding: "page_1",
    pages: {
      "page_1":
        new PageConfiguration({
          title: "First Page",
          components: [
            new FooConfiguration({
              text: "hello", yieldingObservables: {userInput: "foo_user_input"}
            }),
            new BarConfiguration({text: "world", consumingObservables: {dynamic_text: "foo_user_input"}}),
          ]
        })
    }
  })
;
