import {ComponentConfiguration} from "configuration-driven-core";
import {TableComponent} from "./table.component";

export class TableConfiguration extends ComponentConfiguration<TableComponent, {}, ["columnDefs", "rowData"]> {
  constructor(args: Omit<TableConfiguration, "componentType">) {
    super();
    Object.assign(this, {...args, componentType: TableComponent});
  }
}
