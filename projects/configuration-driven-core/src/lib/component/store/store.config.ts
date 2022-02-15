import {ComponentConfiguration} from "../base/component-configuration";
import {StoreComponent} from "./store.component";

export class StoreConfiguration extends ComponentConfiguration<StoreComponent, {}, {}> {
  constructor(public readonly states: Record<string, any>) {
    super(StoreComponent);
  }
}
