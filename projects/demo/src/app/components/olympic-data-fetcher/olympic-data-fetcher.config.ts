import {ComponentConfiguration, YieldType, ExcludedAttributes} from "configuration-driven-core";
import {OlympicDataFetcherComponent} from "./olympic-data-fetcher.component";

export class OlympicDataFetcherConfig extends ComponentConfiguration<OlympicDataFetcherComponent> {
  public readonly yieldingObservables: YieldType<{ data: [] }>;
  constructor(args: Omit<OlympicDataFetcherConfig, ExcludedAttributes>) {
    super();
    Object.assign(this, {...args, componentType: OlympicDataFetcherComponent});
  }
}
