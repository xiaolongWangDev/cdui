import {ComponentConfiguration} from "./base/component-configuration";
import {ConfigurationDrivenComponent} from "./base/configuration-driven-component";

export class ObservableReference {
  constructor(public readonly observableId: string) {
  }
}

export type ValueOrObservableReference = any | ObservableReference;


export type AnyComponentConfiguration = ComponentConfiguration<any>;

export type AnyConfigurationDrivenComponent = ConfigurationDrivenComponent<any>;
