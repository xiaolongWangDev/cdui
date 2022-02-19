import {AlertComponent} from "./alert.component";
import {ComponentConfiguration} from "../../base/component-configuration";

export class AlertConfiguration extends ComponentConfiguration<AlertComponent, {}, {}> {
  public readonly type: string;
  public readonly content?: string;
  public readonly htmlContent?: string;

  constructor(args: Omit<AlertConfiguration, "componentType">) {
    super();
    Object.assign(this, {...args, componentType: AlertComponent});
  }
}
