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
export type ExcludedAttributes = "componentType" | "getYieldingObservables" | "getConsumingObservables"

export class ComponentConfiguration<COMP_TYPE extends AnyConfigurationDrivenComponent> {

  // what component am I going to create
  public readonly componentType: Type<COMP_TYPE>;
  // give an id so that the created component can be identified
  public readonly id?: string;
  // which observables that I yield actually need to be kept in a store instead of locally
  public readonly keepInStore?: string[];
  // all component could declare a store which can keep random state information,
  // not like a store service, the lifespan of the store is as long as the declaring component.
  public readonly store?: StoreConfiguration;

  public getYieldingObservables<CONCRETE_YIELD_PARAM_TYPE extends YieldParamType>(): YieldType<CONCRETE_YIELD_PARAM_TYPE> {
    return (this as any)['yieldingObservables'];
  }

  public getConsumingObservables<CONCRETE_CONSUME_TYPE extends ConsumeParamType>(): ConsumeType<CONCRETE_CONSUME_TYPE> {
    return (this as any)['consumingObservables'];
  }
}
