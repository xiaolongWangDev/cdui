import {
  ComponentConfiguration,
  ConsumeType,
  ExcludedAttributes,
  YieldType
} from "configuration-driven-core";
import {TabComponent} from "./tab.component";


export class TabConfiguration extends ComponentConfiguration {
  public readonly tabLabels: string[];
  public readonly components: ComponentConfiguration[];
  public readonly consumingObservables: ConsumeType<["activeTab"]>;
  public readonly yieldingObservables: YieldType<{ activeTab: [] }>;

  constructor(args: SimpleConfig) {
    super();
    const config: Omit<TabConfiguration, ExcludedAttributes> = {
      tabLabels: args.tabLabels,
      components: args.components,
      ...(args.activeTabObservable && {
        consumingObservables: {
          activeTab: args.activeTabObservable,
        },
        yieldingObservables: {
          activeTab: {
            observableId: args.activeTabObservable
          }
        },
        keepInStore: [args.activeTabObservable]
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
  components: ComponentConfiguration[];
  activeTabObservable?: string;
}

