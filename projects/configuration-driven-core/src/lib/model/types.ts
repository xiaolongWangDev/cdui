import {ConfigurationDrivenComponent} from "../component/base/configuration-driven-component";

export type AnyConfigurationDrivenComponent = ConfigurationDrivenComponent<any>;

export class ObservableReference {
  constructor(public readonly observableId: string) {
  }
}

export type ValueOrObservableReference = any | ObservableReference;

export interface StoreConfiguration {
  readonly states: Record<string, unknown>;
}
