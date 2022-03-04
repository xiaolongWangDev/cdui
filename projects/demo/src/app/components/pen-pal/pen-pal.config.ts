import {ComponentConfiguration, ConsumeType, YieldType, ExcludedAttributes} from "configuration-driven-core";
import {PenPalComponent} from "./pen-pal.component";

export class PenPalConfig extends ComponentConfiguration<PenPalComponent> {
  public readonly name: string;
  public readonly consumingObservables: ConsumeType<["receive"]>;
  public readonly yieldingObservables: YieldType<{ sendOut: [] }>;

  constructor(args: Omit<PenPalConfig, ExcludedAttributes>) {
    super();
    Object.assign(this, {...args, componentType: PenPalComponent});
  }
}
