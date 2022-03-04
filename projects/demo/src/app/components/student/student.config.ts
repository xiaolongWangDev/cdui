import {ComponentConfiguration, ConsumeType, ExcludedAttributes} from "configuration-driven-core";
import {StudentComponent} from "./student.component";

export class StudentConfiguration extends ComponentConfiguration<StudentComponent> {
  public readonly name: string;
  public readonly consumingObservables: ConsumeType<["homework" | "tuition"]>;

  constructor(args: Omit<StudentConfiguration, ExcludedAttributes>) {
    super();
    Object.assign(this, {...args, componentType: StudentComponent});
  }
}
