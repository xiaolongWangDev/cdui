import {Component} from '@angular/core';

@Component({
  templateUrl: "store-page.component.html"
})
export class StorePageComponent {
  storeClassCode=
`export interface StoreConfiguration {
  readonly states: Record<string, unknown>;
}`
  storeInstanceCode=
`store: {
  states: {"alice_mail": "", "bob_mail": ""}
}`
}
