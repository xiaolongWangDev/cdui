import {AppConfiguration} from "../../../configuration-driven-core/src/lib/component/app/app-configuration";
import {PageConfiguration} from "../../../configuration-driven-core/src/lib/component/page/page.config";
import {FooConfiguration} from "../../../configuration-driven-core/src/lib/component/dummy/foo/foo.config";
import {BarConfiguration} from "../../../configuration-driven-core/src/lib/component/dummy/bar/bar.config";

export const mock_config = new AppConfiguration("page_1", {
  "page_1": new PageConfiguration("First Page", [
    new FooConfiguration("hello"),
    new BarConfiguration("world"),
  ])
});
