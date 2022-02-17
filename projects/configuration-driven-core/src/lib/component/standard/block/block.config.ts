import {BlockComponent} from "./block.component";
import {AnyComponentConfiguration} from "../../../model/types";
import {ComponentConfiguration} from "../../base/component-configuration";


export class BlockConfiguration extends ComponentConfiguration<BlockComponent, {}, {}> {
  public readonly components: AnyComponentConfiguration[];
  constructor(args: Omit<BlockConfiguration, "componentType">) {
    super(BlockComponent);
    Object.assign(this, args);
  }
}
