import {PostOfficeComponent} from "./post-office.component";
import {PenPalConfig} from "../pen-pal/pen-pal.config";
import {ComponentConfiguration} from "configuration-driven-core";

export class PostOfficeConfig extends ComponentConfiguration<PostOfficeComponent, {}, {}> {
  public readonly palA: PenPalConfig;
  public readonly palB: PenPalConfig;

  constructor(args: Omit<PostOfficeConfig, "componentType">) {
    super();
    Object.assign(this, {...args, componentType: PostOfficeComponent});
  }
}
