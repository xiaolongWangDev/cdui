import {ComponentConfiguration} from "configuration-driven-core";
import {StudentComponent} from "./student.component";

export class StudentConfiguration extends ComponentConfiguration<StudentComponent, {}, { [P in "homework" | "tuition"]: string }> {
  public readonly name: string;

  constructor(args: Omit<StudentConfiguration, "componentType">) {
    super(StudentComponent);
    Object.assign(this, args);
  }
}
