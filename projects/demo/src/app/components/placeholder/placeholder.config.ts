import {ComponentConfiguration} from "configuration-driven-core";
import {PlaceholderComponent} from "./placeholder.component";

export class PlaceholderConfig extends ComponentConfiguration<PlaceholderComponent, {}, ["value"]> {
  public readonly text: string;
  public readonly textOnly?: boolean = false;
  public readonly parseJson?: boolean = false;
  constructor(args: Omit<PlaceholderConfig, "componentType">) {
    super();
    Object.assign(this, {...args, componentType: PlaceholderComponent});
  }
}
