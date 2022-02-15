import {ComponentConfiguration} from "../component/base/component-configuration";
import {ConfigurationDrivenComponent} from "../component/base/configuration-driven-component";

export type AnyComponentConfiguration = ComponentConfiguration<any, any, any>;

export type AnyConfigurationDrivenComponent = ConfigurationDrivenComponent<any>;

export class ObservableReference {
  constructor(public readonly observableId: string) {
  }
}

export type ValueOrObservableReference = any | ObservableReference;
