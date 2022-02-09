import {ComponentConfiguration} from "../base/component-configuration";
import {PageComponent} from "./page.component";
import {AnyComponentConfiguration} from "../types";


export class PageConfiguration extends ComponentConfiguration<PageComponent> {
  constructor(public readonly title: string, public readonly components: AnyComponentConfiguration[]) {
    super(PageComponent);
  }
}
