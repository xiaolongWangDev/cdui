import {StoreAttachedComponentConfiguration} from "configuration-driven-core";
import {PostOfficeComponent} from "./post-office.component";
import {PenPalConfig} from "../pen-pal/pen-pal.config";

export class PostOfficeConfig extends StoreAttachedComponentConfiguration<PostOfficeComponent, {}, {}> {
  public readonly palA: PenPalConfig;
  public readonly palB: PenPalConfig;

  constructor(args: Omit<PostOfficeConfig, "componentType">) {
    super(PostOfficeComponent);
    Object.assign(this, args);
  }
}
