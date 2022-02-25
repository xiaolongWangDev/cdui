import {ComponentConfiguration, DropdownConfiguration} from "configuration-driven-core";
import {ControlBarComponent} from "./control-bar.component";

export class ControlBarConfig extends ComponentConfiguration<ControlBarComponent, {}, []> {
  public readonly xAxisColumnsDropdownConfig: DropdownConfiguration;
  public readonly yAxisColumnsDropdownConfig: DropdownConfiguration;

  constructor(args: Omit<ControlBarConfig, "componentType">) {
    super();
    Object.assign(this, {...args, componentType: ControlBarComponent});
  }
}
