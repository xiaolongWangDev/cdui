import {
  ConfigurationDrivenComponent,
  TrackedObjectOrchestrationService,
  TrackedObservable
} from "configuration-driven-core";
import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild} from "@angular/core";
import {fromEvent} from "rxjs";
import {map} from "rxjs/operators";
import {TeacherConfiguration} from "./teacher.config";

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
export class TeacherComponent extends ConfigurationDrivenComponent<TeacherConfiguration> implements AfterViewInit, OnDestroy {
  @ViewChild('homework_input', {static: true}) inputElement: ElementRef;

  constructor(private readonly toService: TrackedObjectOrchestrationService) {
    super();
  }

  ngAfterViewInit(): void {
    this.toService.addObject(
      new TrackedObservable(
        this.config.yieldingObservables.homework,
        fromEvent(this.inputElement.nativeElement, 'change')
          .pipe(map((e: any) => e.target.value)))
    );
  }

  ngOnDestroy(): void {
    this.toService.revokeObject(this.config.yieldingObservables.homework);
  }

}
