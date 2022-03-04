import {ComponentConfiguration, YieldType, ExcludedAttributes} from "configuration-driven-core";
import {HeadmasterComponent} from "./headmaster.component";
import {TeacherConfiguration} from "../teacher/teacher.config";

export class HeadmasterConfiguration extends ComponentConfiguration<HeadmasterComponent> {
  public readonly name: string;
  public readonly manages: TeacherConfiguration[];
  public readonly yieldingObservables: YieldType<{ tuition: [] }>;

  constructor(args: Omit<HeadmasterConfiguration, ExcludedAttributes>) {
    super();
    Object.assign(this, {...args, componentType: HeadmasterComponent});
  }
}
