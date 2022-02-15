import {ConfigurationDrivenComponent, DynamicObservableOrchestrationService,} from "configuration-driven-core";
import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild} from "@angular/core";
import {fromEvent} from "rxjs";
import {map} from "rxjs/operators";
import {TeacherConfiguration} from "./teacher.config";
import {markAsDemo, setNullAttributes} from "../../helper/Helper";

@Component({
  selector: "demo-teacher",
  template: `
    <div class="m-2" style="border:1px solid black;">
      <div>Teacher: My name is {{config.name}}</div>
      <div>Today's homework is <input #homework_input type="text"></div>
      <div *ngFor="let studentConf of config.teaches">
        <demo-student [config]="studentConf"></demo-student>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeacherComponent extends ConfigurationDrivenComponent<TeacherConfiguration> implements AfterViewInit {
  @ViewChild('homework_input', {static: true}) inputElement: ElementRef;

  constructor(private readonly obsService: DynamicObservableOrchestrationService) {
    super();
  }

  ngAfterViewInit(): void {
    const homeworkObj = markAsDemo(
      markAsDemo(
        fromEvent(this.inputElement.nativeElement, 'change'),
        this.config.yieldingObservables.homework + "_from_event")
        .pipe(map((e: any) => e.target.value)),
      this.config.yieldingObservables.homework
    );

    const keepInStore: Set<string> = new Set(this.config.keepInStore);
    this.obsService.add(this.config.yieldingObservables.homework, homeworkObj, keepInStore, this.destroy$);
  }


  destroyExtra(): void {
    this.obsService.revokeObservable(this.config.yieldingObservables.homework);
    setNullAttributes(this);
  }

}
