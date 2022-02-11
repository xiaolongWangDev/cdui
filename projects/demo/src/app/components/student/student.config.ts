import {ConsumingComponentConfiguration} from "configuration-driven-core";
import {StudentComponent} from "./student.component";

export class StudentConfiguration extends ConsumingComponentConfiguration<StudentComponent, {homework: string}> {
  public readonly name: string;
  constructor(args: Omit<StudentConfiguration, "componentType">) {
    super(StudentComponent, args.consumingObservables);
    Object.assign(this, args);
  }
}
