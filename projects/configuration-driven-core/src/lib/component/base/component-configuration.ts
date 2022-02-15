import {Type} from "@angular/core";
import {AnyConfigurationDrivenComponent} from "../../model/types";
import {StoreConfiguration} from "../store/store.config";

export class ComponentConfiguration<COMP_TYPE extends AnyConfigurationDrivenComponent,
  YIELD_TYPE extends Record<string, string>,
  CONSUME_TYPE extends Record<string, string>> {
  public readonly componentType: Type<COMP_TYPE>;
  //
  public readonly yieldingObservables?: YIELD_TYPE;
  public readonly keepInStore?: string[];
  //
  public readonly consumingObservables?: CONSUME_TYPE;

  constructor(componentType: Type<COMP_TYPE>) {
  }
}

export class StoreAttachedComponentConfiguration<COMP_TYPE extends AnyConfigurationDrivenComponent,
  YIELD_TYPE extends Record<string, string>,
  CONSUME_TYPE extends Record<string, string>>
  extends ComponentConfiguration<COMP_TYPE, YIELD_TYPE, CONSUME_TYPE> {

  public readonly store: StoreConfiguration;

  constructor(componentType: Type<COMP_TYPE>) {
    super(componentType);
  }
}
