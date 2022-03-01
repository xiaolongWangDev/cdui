import {ComponentConfiguration} from "configuration-driven-core";
import {ControlBarComponent} from "./control-bar.component";
import {DropdownConfiguration} from "../dropdown/dropdown.config";

export class ControlBarConfig extends ComponentConfiguration<ControlBarComponent, {}, []> {
  public readonly xAxisColumnsDropdownConfig: DropdownConfiguration;
  public readonly yAxisColumnsDropdownConfig: DropdownConfiguration;

  constructor(args: Omit<ControlBarConfig, "componentType">) {
    super();
    Object.assign(this, {...args, componentType: ControlBarComponent});
  }
}
