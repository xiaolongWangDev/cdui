import {ComponentConfiguration, ConsumeType, ExcludedAttributes, YieldType} from "configuration-driven-core";
import {TableComponent} from "./table.component";

export class TableConfiguration extends ComponentConfiguration {
  public readonly consumingObservables: ConsumeType<["columnDefs", "rowData"]>;
  public readonly yieldingObservables?: YieldType<{ clickEvent: [] }>;

  constructor(args: Omit<TableConfiguration, ExcludedAttributes>) {
    super();
    Object.assign(this, {...args, componentType: TableComponent});
  }
}
