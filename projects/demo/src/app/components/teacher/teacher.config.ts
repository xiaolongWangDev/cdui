import {TeacherComponent} from "./teacher.component";
import {StudentConfiguration} from "../student/student.config";
import {ComponentConfiguration, ExcludedAttributes, YieldType} from "configuration-driven-core";

export class TeacherConfiguration extends ComponentConfiguration<TeacherComponent> {
  public readonly name: string;
  public readonly teaches: StudentConfiguration[];
  public readonly yieldingObservables: YieldType<{ homework: [] }>;

  constructor(args: Omit<TeacherConfiguration, ExcludedAttributes>) {
    super();
    Object.assign(this, {...args, componentType: TeacherComponent});
  }
}
