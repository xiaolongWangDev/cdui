import {ComponentConfiguration, YieldType, ExcludedAttributes} from "configuration-driven-core";
import {TableDataFetcherComponent} from "./table-data-fetcher.component";

export class TableDataFetcherConfig extends ComponentConfiguration {
  public readonly yieldingObservables: YieldType<{ data: [] }>;
  constructor(args: Omit<TableDataFetcherConfig, ExcludedAttributes>) {
    super();
    Object.assign(this, {...args, componentType: TableDataFetcherComponent});
  }
}
