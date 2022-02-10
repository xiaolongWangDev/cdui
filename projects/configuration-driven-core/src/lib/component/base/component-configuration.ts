import {Type} from "@angular/core";
import {MiniStoreConfiguration} from "../mini-store/mini-store.config";
import {AnyConfigurationDrivenComponent} from "../../model/types";

export class ComponentConfiguration<COMP_TYPE extends AnyConfigurationDrivenComponent> {
  constructor(public readonly componentType: Type<COMP_TYPE>) {
  }
}

export class YieldingComponentConfiguration<COMP_TYPE extends AnyConfigurationDrivenComponent,
  YIELD_TYPE extends Record<string, string>>
  extends ComponentConfiguration<COMP_TYPE> {
  constructor(public readonly componentType: Type<COMP_TYPE>,
              public readonly yieldingObservables: YIELD_TYPE) {
    super(componentType);
  }
}

export class ConsumingComponentConfiguration<COMP_TYPE extends AnyConfigurationDrivenComponent,
  CONSUME_TYPE extends Record<string, string>>
  extends ComponentConfiguration<COMP_TYPE> {
  constructor(public readonly componentType: Type<COMP_TYPE>,
              public readonly consumingObservables: CONSUME_TYPE) {
    super(componentType);
  }
}

export class StoreAttachedComponentConfiguration<COMP_TYPE extends AnyConfigurationDrivenComponent>
  extends ComponentConfiguration<COMP_TYPE> {
  constructor(public readonly componentType: Type<COMP_TYPE>,
              public readonly store: MiniStoreConfiguration) {
    super(componentType);
  }
}
