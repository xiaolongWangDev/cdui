import {ComponentConfiguration, ConsumeType, ExcludedAttributes} from "configuration-driven-core";
import {TopPlayersComponent} from "./top-players.component";

export class TopPlayersConfig extends ComponentConfiguration<TopPlayersComponent> {
  public readonly height?: string = "500px"
  public readonly consumingObservables: ConsumeType<["data"]>;
  constructor(args: Omit<TopPlayersConfig, ExcludedAttributes>) {
    super();
    Object.assign(this, {...args, componentType: TopPlayersComponent});
  }
}
