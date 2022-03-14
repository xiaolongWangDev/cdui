import {Component} from '@angular/core';
import {PageConfiguration} from "../components/page/page.config";
import {AlertConfiguration} from "../components/alert/alert.config";

@Component({
  templateUrl: "model-part-one-page.component.html"
})
export class ModelPartOnePageComponent {
  componentConfigurationCode =
`export class ComponentConfiguration {

  // what component am I going to create
  public readonly componentType: Type<AnyConfigurationDrivenComponent>;
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
`

  penPalCode =
`export class PenPalConfig extends ComponentConfiguration {
  public readonly name: string;
  public readonly consumingObservables: ConsumeType<["receive"]>;
  public readonly yieldingObservables: YieldType<{ sendOut: [] }>;

  constructor(args: Omit<PenPalConfig, ExcludedAttributes>) {
    super();
    Object.assign(this, {...args, componentType: PenPalComponent});
  }
}
`

  penPalInstanceCode =
`new PenPalConfig({
    name: "Alice",
    yieldingObservables: {
      sendOut: {
        observableId: "alice_mail"
      },
    },
    keepInStore: ["alice_mail"],
    consumingObservables: {
      receive: "bob_mail"
    }
  })`

  simpleYieldCode =
`{
    sendOut: {
      observableId: "alice_mail"
    }
}`
  fullYieldCode =
    `{
    foo: {
      observableId: "some_foo",
      dependsOn: {
        bar: "some_bar",
        bee: "some_bee"
      }
    }
}`
}
