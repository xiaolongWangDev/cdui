import {BlockComponent} from "./block.component";
import {ComponentConfiguration, ExcludedAttributes} from "configuration-driven-core";

export class BlockConfiguration extends ComponentConfiguration {
  public readonly components: ComponentConfiguration[];

  constructor(args: Omit<BlockConfiguration, ExcludedAttributes>) {
    super();
    Object.assign(this, {...args, componentType: BlockComponent});
  }
}
