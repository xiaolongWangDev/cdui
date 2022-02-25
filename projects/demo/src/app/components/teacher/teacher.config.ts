import {TeacherComponent} from "./teacher.component";
import {StudentConfiguration} from "../student/student.config";
import {ComponentConfiguration} from "configuration-driven-core";

export class TeacherConfiguration extends ComponentConfiguration<TeacherComponent, { homework: [] }, {}> {
  public readonly name: string;
  public readonly teaches: StudentConfiguration[];

  constructor(args: Omit<TeacherConfiguration, "componentType">) {
    super();
    Object.assign(this, {...args, componentType: TeacherComponent});
  }
}
