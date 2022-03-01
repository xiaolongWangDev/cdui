import {DropdownComponent} from "./dropdown.component";
import {ComponentConfiguration} from "configuration-driven-core";


export class DropdownConfiguration extends ComponentConfiguration<DropdownComponent, { selection: ["options"] }, ["options"]> {
  public readonly label: string;

  constructor(args: SimpleConfig) {
    super();
    const config = {
      label: args.label,
      consumingObservables: {options: args.optionsObservable},
      yieldingObservables: {
        selection: {
          observableId: args.selectionObservable,
          dependsOn: {
            options: args.optionsObservable
          }
        }
      },
      ...(args.keepInStore && {keepInStore: [args.selectionObservable]})
    }
    Object.assign(this, {...config, componentType: DropdownComponent});
  }
}

type SimpleConfig = {
  label: string;
  optionsObservable: string;
  selectionObservable: string;
  keepInStore: boolean;
}
