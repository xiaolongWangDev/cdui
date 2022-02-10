import {YieldingComponentConfiguration} from "configuration-driven-core";
import {FooComponent} from "./foo.component";

export class FooConfiguration extends YieldingComponentConfiguration<FooComponent, { userInput: string }> {
  public readonly text: string;

  constructor(args: Omit<FooConfiguration, "componentType">) {
    super(FooComponent, args.yieldingObservables);
    Object.assign(this, args);
  }
}
