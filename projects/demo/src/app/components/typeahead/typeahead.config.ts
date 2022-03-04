import {ComponentConfiguration, ConsumeType, YieldType} from "configuration-driven-core";
import {TypeaheadComponent} from "./typeahead.component";

export class TypeaheadConfiguration extends ComponentConfiguration<TypeaheadComponent> {
  public readonly label: string;
  public readonly consumingObservables: ConsumeType<["options"]>;
  public readonly yieldingObservables: YieldType<{ selection: ["options"] }>;

  constructor(args: SimpleConfig) {
    super();
    const config = {
      label: args.label,
      consumingObservables: {
        options: args.optionsObservable
      },
      yieldingObservables: {
        selection: {
          observableId: args.selectionObservable,
          dependsOn: {options: args.optionsObservable},
        }
      },
      ...(args.keepInStore && {keepInStore: [args.selectionObservable]})
    }

    Object.assign(this, {...config, componentType: TypeaheadComponent});
  }
}

type SimpleConfig = {
  label: string;
  optionsObservable: string;
  selectionObservable: string;
  keepInStore: boolean;
}
