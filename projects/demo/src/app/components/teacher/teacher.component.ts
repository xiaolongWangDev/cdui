import {
  ConfigurationDrivenComponent,
  DynamicObservableOrchestrationService,
  markAsTracked
} from "configuration-driven-core";
import {ChangeDetectionStrategy, Component, ElementRef, ViewChild} from "@angular/core";
import {fromEvent, Observable} from "rxjs";
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
export class TeacherComponent extends ConfigurationDrivenComponent<TeacherConfiguration> {
  @ViewChild('homework_input', {static: true}) inputElement: ElementRef;

  constructor(obsService: DynamicObservableOrchestrationService) {
    super(obsService);
  }

  protected readyToYieldObservables(): Record<string, Observable<any>> {
    let homeworkObsId = this.config.yieldingObservables.homework;
    // this is convoluted because of the use of markAsTracked. In production, we don't need to use them.
    // They are just here to aggressively track all observables we created including the intermediate ones
    // so that we are very sure no observable created by us is leaking memory
    const homeworkObs =
      markAsTracked(
        markAsTracked(
          fromEvent(this.inputElement.nativeElement, 'change'),
          homeworkObsId + "_from_event")
          .pipe(map((e: any) => e.target.value)),
        homeworkObsId);
    return {[homeworkObsId]: homeworkObs}
  }
}
