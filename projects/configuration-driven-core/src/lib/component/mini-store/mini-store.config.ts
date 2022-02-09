import {MiniStoreComponent} from "./mini-store.component";
import {ComponentConfiguration} from "../base/component-configuration";

export class MiniStoreConfiguration extends ComponentConfiguration<MiniStoreComponent> {
  constructor(public readonly stateAndInitValue: Record<string, any>) {
    super(MiniStoreComponent);
  }
}
