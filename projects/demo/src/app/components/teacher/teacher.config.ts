import {YieldingComponentConfiguration} from "configuration-driven-core";
import {TeacherComponent} from "./teacher.component";
import {StudentConfiguration} from "../student/student.config";

export class TeacherConfiguration extends YieldingComponentConfiguration<TeacherComponent, { homework: string }> {
  public readonly name: string;
  public readonly teaches: StudentConfiguration[];

  constructor(args: Omit<TeacherConfiguration, "componentType">) {
    super(TeacherComponent);
    Object.assign(this, args);
  }
}
