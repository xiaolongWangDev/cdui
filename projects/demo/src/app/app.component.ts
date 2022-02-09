import { Component } from '@angular/core';
import {mock_config} from "../helper/Helper";

@Component({
  selector: 'app-root',
  template: `
  <cd-page [config]="page_config"></cd-page>
  `,
})
export class AppComponent {
  page_config = mock_config.pages[mock_config.defaultLanding];
}
