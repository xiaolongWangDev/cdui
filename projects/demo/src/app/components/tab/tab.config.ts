import {AnyComponentConfiguration, ComponentConfiguration} from "configuration-driven-core";
import {TabComponent} from "./tab.component";


export class TabConfiguration extends ComponentConfiguration<TabComponent, {}, []> {
  public readonly tabLabels: string[];
  public readonly components: AnyComponentConfiguration[];
  constructor(args: Omit<TabConfiguration, "componentType">) {
    super();
    Object.assign(this, {...args, componentType: TabComponent});
    if(this.tabLabels.length != this.components.length) {
      throw new Error("tabLabels and components must be of the same length");
    }
  }
}
