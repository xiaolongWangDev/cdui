import {DropdownComponent} from "./dropdown.component";
import {ComponentConfiguration, ConsumeType, YieldType} from "configuration-driven-core";


export class DropdownConfiguration extends ComponentConfiguration<DropdownComponent> {
  public readonly label: string;
  public readonly consumingObservables: ConsumeType<["options"]>;
  public readonly yieldingObservables: YieldType<{ selection: ["options"] }>;

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
