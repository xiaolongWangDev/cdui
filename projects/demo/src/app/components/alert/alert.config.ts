import {AlertComponent} from "./alert.component";
import {ComponentConfiguration, ExcludedAttributes} from "configuration-driven-core";

export class AlertConfiguration extends ComponentConfiguration {
  public readonly type: string;
  public readonly content?: string;
  public readonly htmlContent?: string;

  constructor(args: Omit<AlertConfiguration, ExcludedAttributes>) {
    super();
    Object.assign(this, {...args, componentType: AlertComponent});
  }
}
