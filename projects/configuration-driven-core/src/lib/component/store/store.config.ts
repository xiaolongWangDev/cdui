import {ComponentConfiguration} from "../base/component-configuration";

// this configuration does not need a component
export class StoreConfiguration extends ComponentConfiguration<null, {}, {}> {
  public readonly states: Record<string, any>;
  constructor(args: Omit<StoreConfiguration, "componentType">) {
    super();
    Object.assign(this, {...args, componentType: null});
  }
}
