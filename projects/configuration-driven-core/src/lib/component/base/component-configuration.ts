import {Type} from "@angular/core";
import {AnyConfigurationDrivenComponent} from "../../model/types";
import {StoreConfiguration} from "../store/store.config";

type NonEmptyStringArray = [string, ...string[]]

type YieldParamType = {
  [yieldObservableRole: string]: [] | NonEmptyStringArray
}

type Indices<T> = Exclude<keyof T, keyof string[]>;
type StringTupleToStringLiteralUnion<T> = Extract<T[Indices<T>], string>

export type YieldType<T extends YieldParamType> = {
  [P in keyof T]: T[P] extends NonEmptyStringArray ? {
      observableId: string;
      dependsOn: {
        [U in StringTupleToStringLiteralUnion<T[P]>]: string
      }
    } :
    {
      observableId: string;
      dependsOn?: {
        [U in StringTupleToStringLiteralUnion<T[P]>]: string
      }
    }
}

type ConsumeParamType = string[]
export type ConsumeType<T extends ConsumeParamType> = {
  [P in StringTupleToStringLiteralUnion<T>]: string
}


export class ComponentConfiguration<COMP_TYPE extends AnyConfigurationDrivenComponent,
  CONCRETE_YIELD_PARAM_TYPE extends YieldParamType,
  CONCRETE_CONSUME_TYPE extends ConsumeParamType> {

  public readonly componentType: Type<COMP_TYPE>;

  public readonly id?: string;
  //
  public readonly yieldingObservables?: YieldType<CONCRETE_YIELD_PARAM_TYPE>;
  public readonly keepInStore?: string[];
  //
  public readonly consumingObservables?: ConsumeType<CONCRETE_CONSUME_TYPE>;
  //
  public readonly store?: StoreConfiguration;
}
