import {PageComponent} from "./page.component";
import {AnyComponentConfiguration, ComponentConfiguration, ExcludedAttributes} from "configuration-driven-core";


export class PageConfiguration extends ComponentConfiguration<PageComponent> {
  public readonly title: string;
  public readonly components: AnyComponentConfiguration[];

  constructor(args: Omit<PageConfiguration, ExcludedAttributes>) {
    super();
    Object.assign(this, {...args, componentType: PageComponent});
  }
}
