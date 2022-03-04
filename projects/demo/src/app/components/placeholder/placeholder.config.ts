import {ComponentConfiguration, ConsumeType, ExcludedAttributes} from "configuration-driven-core";
import {PlaceholderComponent} from "./placeholder.component";

export class PlaceholderConfig extends ComponentConfiguration<PlaceholderComponent> {
  public readonly text: string;
  public readonly textOnly?: boolean = false;
  public readonly parseJson?: boolean = false;
  public readonly consumingObservables?: ConsumeType<["value"]>;
  constructor(args: Omit<PlaceholderConfig, ExcludedAttributes>) {
    super();
    Object.assign(this, {...args, componentType: PlaceholderComponent});
  }
}
