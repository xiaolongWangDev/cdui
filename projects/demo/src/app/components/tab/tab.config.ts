import {
  AnyComponentConfiguration,
  ComponentConfiguration,
  ConsumeType,
  ExcludedAttributes, YieldType
} from "configuration-driven-core";
import {TabComponent} from "./tab.component";


export class TabConfiguration extends ComponentConfiguration<TabComponent> {
  public readonly tabLabels: string[];
  public readonly components: AnyComponentConfiguration[];
  public readonly consumingObservables: ConsumeType<["activeTab"]>;
  public readonly yieldingObservables: YieldType<{ activeTab: [] }>;

  constructor(args: SimpleConfig) {
    super();
    const config = {
      tabLabels: args.tabLabels,
      components: args.components,
      ...(args.activeTabObservable && {
        consumingObservables: {
          activeTab: args.activeTabObservable
        },
        yieldingObservables: {
          activeTab: args.activeTabObservable
        },
        keepInStore: ["activeTab"]
      })
    }

    Object.assign(this, {...config, componentType: TabComponent});
    if (this.tabLabels.length != this.components.length) {
      throw new Error("tabLabels and components must be of the same length");
    }
  }
}

type SimpleConfig = {
  tabLabels: string[];
  components: AnyComponentConfiguration[];
  activeTabObservable?: string;
}

