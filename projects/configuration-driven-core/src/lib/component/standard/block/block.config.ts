import {BlockComponent} from "./block.component";
import {AnyComponentConfiguration} from "../../../model/types";
import {ComponentConfiguration} from "../../base/component-configuration";


export class BlockConfiguration extends ComponentConfiguration<BlockComponent, {}, {}> {
  public readonly components: AnyComponentConfiguration[];
  constructor(args: Omit<BlockConfiguration, "componentType">) {
    super();
    Object.assign(this, {...args, componentType: BlockComponent});
    Object.assign(this, args);
  }
}
