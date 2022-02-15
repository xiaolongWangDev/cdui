import {ComponentConfiguration} from "../base/component-configuration";
import {StoreComponent} from "./store.component";

export class StoreConfiguration extends ComponentConfiguration<StoreComponent, {}, {}> {
  public readonly states: Record<string, any>;
  constructor(args: Omit<StoreConfiguration, "componentType">) {
    super(StoreComponent);
    Object.assign(this, args);
  }
}
