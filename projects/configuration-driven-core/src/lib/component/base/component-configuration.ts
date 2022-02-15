import {Type} from "@angular/core";
import {AnyConfigurationDrivenComponent} from "../../model/types";
import {StoreConfiguration} from "../store/store.config";

export class ComponentConfiguration<COMP_TYPE extends AnyConfigurationDrivenComponent> {
  constructor(public readonly componentType: Type<COMP_TYPE>) {
  }
}

export class YieldingComponentConfiguration<COMP_TYPE extends AnyConfigurationDrivenComponent,
  YIELD_TYPE extends Record<string, string>>
  extends ComponentConfiguration<COMP_TYPE> {
  public readonly yieldingObservables: YIELD_TYPE;
  public readonly keepInStore?: string[];
  constructor(public readonly componentType: Type<COMP_TYPE>) {
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
              public readonly store: StoreConfiguration) {
    super(componentType);
  }
}
