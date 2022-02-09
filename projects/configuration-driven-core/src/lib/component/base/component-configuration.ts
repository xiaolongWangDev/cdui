import {Type} from "@angular/core";
import {MiniStoreConfiguration} from "../mini-store/mini-store.config";
import {AnyConfigurationDrivenComponent} from "../types";

export class ComponentConfiguration<COMP_TYPE extends AnyConfigurationDrivenComponent> {
  constructor(public readonly componentType: Type<COMP_TYPE>) {
  }
}

export class StoreAttachedComponentConfiguration<C extends AnyConfigurationDrivenComponent>
  extends ComponentConfiguration<C> {
  constructor(public readonly componentType: Type<C>, public readonly store: MiniStoreConfiguration) {
    super(componentType);
  }
}
