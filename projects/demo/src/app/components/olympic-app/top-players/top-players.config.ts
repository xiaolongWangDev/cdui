import {ComponentConfiguration, ConsumeType} from "configuration-driven-core";
import {TopPlayersComponent} from "./top-players.component";

export class TopPlayersConfig extends ComponentConfiguration<TopPlayersComponent, {}, ["data"]> {
  public readonly consumingObservables: ConsumeType<["data"]>;
  constructor(args: Omit<TopPlayersConfig, "componentType">) {
    super();
    Object.assign(this, {...args, componentType: TopPlayersComponent});
  }
}
