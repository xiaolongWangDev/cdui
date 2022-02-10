import {ConsumingComponentConfiguration} from "configuration-driven-core";
import {BarComponent} from "./bar.component";

export class BarConfiguration extends ConsumingComponentConfiguration<BarComponent, {dynamic_text: string}> {
  public readonly text: string;
  constructor(args: Omit<BarConfiguration, "componentType">) {
    super(BarComponent, args.consumingObservables);
    Object.assign(this, args);
  }
}
