import {BlockComponent} from "./block.component";
import {AnyComponentConfiguration, ComponentConfiguration} from "configuration-driven-core";


export class BlockConfiguration extends ComponentConfiguration<BlockComponent, {}, []> {
  public readonly components: AnyComponentConfiguration[];

  constructor(args: Omit<BlockConfiguration, "componentType">) {
    super();
    Object.assign(this, {...args, componentType: BlockComponent});
  }
}
