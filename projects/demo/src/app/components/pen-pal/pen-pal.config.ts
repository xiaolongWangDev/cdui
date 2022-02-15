import {ComponentConfiguration} from "configuration-driven-core";
import {PenPalComponent} from "./pen-pal.component";

export class PenPalConfig extends ComponentConfiguration<PenPalComponent, { sendOut: string }, { receive: string }> {
  public readonly name: string;

  constructor(args: Omit<PenPalConfig, "componentType">) {
    super(PenPalComponent);
    Object.assign(this, args);
  }
}
