import {ComponentConfiguration} from "../../base/component-configuration";
import {DropdownComponent} from "./dropdown.component";


export class DropdownConfiguration extends ComponentConfiguration<DropdownComponent, { selection: string }, { options: string }> {
  public readonly label: string;

  constructor(args: Omit<DropdownConfiguration, "componentType">) {
    super();
    Object.assign(this, {...args, componentType: DropdownComponent});
  }
}
