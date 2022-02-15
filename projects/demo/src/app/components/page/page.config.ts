import {PageComponent} from "./page.component";
import {AnyComponentConfiguration, ComponentConfiguration} from "configuration-driven-core";


export class PageConfiguration extends ComponentConfiguration<PageComponent, {}, {}> {
  public readonly title: string;
  public readonly components: AnyComponentConfiguration[];
  constructor(args: Omit<PageConfiguration, "componentType">) {
    super(PageComponent);
    Object.assign(this, args);
  }
}
