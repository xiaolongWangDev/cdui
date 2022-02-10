import {ComponentConfiguration} from "../base/component-configuration";
import {PageComponent} from "./page.component";
import {AnyComponentConfiguration} from "../../model/types";


export class PageConfiguration extends ComponentConfiguration<PageComponent> {
  public readonly title: string;
  public readonly components: AnyComponentConfiguration[];
  constructor(args: Omit<PageConfiguration, "componentType">) {
    super(PageComponent);
    Object.assign(this, args);
  }
}
