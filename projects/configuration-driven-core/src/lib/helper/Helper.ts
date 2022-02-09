import {AppConfiguration} from "../component/app/app-configuration";
import {PageConfiguration} from "../component/page/page.config";
import {FooConfiguration} from "../component/dummy/foo/foo.config";
import {BarConfiguration} from "../component/dummy/bar/bar.config";

export const mock_config = new AppConfiguration("page_1", {
  "page_1": new PageConfiguration("First Page", [
    new FooConfiguration("hello"),
    new BarConfiguration("world"),
  ])
});
