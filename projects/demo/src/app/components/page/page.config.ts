import {PageComponent} from "./page.component";
import {ComponentConfiguration, ExcludedAttributes} from "configuration-driven-core";


export class PageConfiguration extends ComponentConfiguration {
  public readonly title: string;
  public readonly components: ComponentConfiguration[];

  constructor(args: Omit<PageConfiguration, ExcludedAttributes>) {
    super();
    Object.assign(this, {...args, componentType: PageComponent});
  }
}
