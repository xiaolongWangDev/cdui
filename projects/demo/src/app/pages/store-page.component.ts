import {Component} from '@angular/core';

@Component({
  templateUrl: "store-page.component.html"
})
export class StorePageComponent {
  storeClassCode=
`export class StoreConfiguration extends ComponentConfiguration<null> {
  public readonly states: Record<string, any>;

  constructor(args: Omit<StoreConfiguration, ExcludedAttributes>) {
    super();
    Object.assign(this, {...args, componentType: null});
  }
}`
  storeInstanceCode=
`store: new StoreConfiguration({
  states: {"alice_mail": "", "bob_mail": ""}
})`
}
