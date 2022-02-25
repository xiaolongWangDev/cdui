import {ComponentConfiguration} from "configuration-driven-core";
import {HeadmasterComponent} from "./headmaster.component";
import {TeacherConfiguration} from "../teacher/teacher.config";

export class HeadmasterConfiguration extends ComponentConfiguration<HeadmasterComponent, { tuition: [] }, []> {
  public readonly name: string;
  public readonly manages: TeacherConfiguration[];

  constructor(args: Omit<HeadmasterConfiguration, "componentType">) {
    super();
    Object.assign(this, {...args, componentType: HeadmasterComponent});
  }
}
