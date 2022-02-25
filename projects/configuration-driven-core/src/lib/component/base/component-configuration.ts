import {Type} from "@angular/core";
import {AnyConfigurationDrivenComponent} from "../../model/types";
import {StoreConfiguration} from "../store/store.config";

type NonEmptyStringArray = [string, ...string[]]

type YieldParamType = {
  [yieldObservableIdentity: string]: [] | NonEmptyStringArray
}

type ArrayKeys = keyof string[];
type Indices<T> = Exclude<keyof T, ArrayKeys>;

type YieldType<T extends { [yieldObservableIdentity: string]: any }> = {
  [P in keyof T]: T[P] extends NonEmptyStringArray ? {
      observableId: string;
      dependsOn: {
        [U in T[P][Indices<T[P]>]]: string
      }
    } :
    {
      observableId: string;
      dependsOn?: {
        [U in T[P][Indices<T[P]>]]: string
      }
    }
}


export class ComponentConfiguration<COMP_TYPE extends AnyConfigurationDrivenComponent,
  CONCRETE_YIELD_PARAM_TYPE extends YieldParamType,
  CONCRETE_CONSUME_TYPE extends Record<string, string>> {

  public readonly componentType: Type<COMP_TYPE>;

  public readonly id?: string;
  //
  public readonly yieldingObservables?: YieldType<CONCRETE_YIELD_PARAM_TYPE>;
  public readonly keepInStore?: string[];
  //
  public readonly consumingObservables?: CONCRETE_CONSUME_TYPE;
  //
  public readonly store?: StoreConfiguration;
}
