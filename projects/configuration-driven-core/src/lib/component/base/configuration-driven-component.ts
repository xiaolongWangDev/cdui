import {Component, Input} from "@angular/core";
import {AnyComponentConfiguration} from "../../model/types";

@Component({template: ``})
export abstract class ConfigurationDrivenComponent<CONF_TYPE extends AnyComponentConfiguration> {
  @Input() config: CONF_TYPE;
}
