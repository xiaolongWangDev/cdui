import {ComponentConfiguration} from "configuration-driven-core";
import {StudentComponent} from "./student.component";

export class StudentConfiguration extends ComponentConfiguration<StudentComponent, {}, ["homework" | "tuition"]> {
  public readonly name: string;

  constructor(args: Omit<StudentConfiguration, "componentType">) {
    super();
    Object.assign(this, {...args, componentType: StudentComponent});
  }
}
