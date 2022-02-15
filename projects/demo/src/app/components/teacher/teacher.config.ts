import {TeacherComponent} from "./teacher.component";
import {StudentConfiguration} from "../student/student.config";
import {ComponentConfiguration} from "configuration-driven-core";

export class TeacherConfiguration extends ComponentConfiguration<TeacherComponent, { homework: string }, {}> {
  public readonly name: string;
  public readonly teaches: StudentConfiguration[];

  constructor(args: Omit<TeacherConfiguration, "componentType">) {
    super(TeacherComponent);
    Object.assign(this, args);
  }
}
