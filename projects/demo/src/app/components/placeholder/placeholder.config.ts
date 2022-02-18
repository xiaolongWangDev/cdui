import {ComponentConfiguration} from "configuration-driven-core";
import {PlaceholderComponent} from "./placeholder.component";

export class PlaceholderConfig extends ComponentConfiguration<PlaceholderComponent, {}, {value?: string}> {
  public readonly text: string;
  constructor(args: Omit<PlaceholderConfig, "componentType">) {
    super(PlaceholderComponent);
    Object.assign(this, args);
  }
}
