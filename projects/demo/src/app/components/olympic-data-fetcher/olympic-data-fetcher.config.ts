import {ComponentConfiguration} from "configuration-driven-core";
import {OlympicDataFetcherComponent} from "./olympic-data-fetcher.component";

export class OlympicDataFetcherConfig extends ComponentConfiguration<OlympicDataFetcherComponent, {data: []}, []> {
  constructor(args: Omit<OlympicDataFetcherConfig, "componentType">) {
    super();
    Object.assign(this, {...args, componentType: OlympicDataFetcherComponent});
  }
}
