import {ComponentConfiguration} from "configuration-driven-core";
import {PenPalComponent} from "./pen-pal.component";

export class PenPalConfig extends ComponentConfiguration<PenPalComponent, { sendOut: [] }, { receive: string }> {
  public readonly name: string;

  constructor(args: Omit<PenPalConfig, "componentType">) {
    super();
    Object.assign(this, {...args, componentType: PenPalComponent});
  }
}
