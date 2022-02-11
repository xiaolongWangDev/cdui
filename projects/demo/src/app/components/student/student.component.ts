import {
  ConfigurationDrivenComponent,
  TrackedBehaviorSubject,
  TrackedObjectOrchestrationService,
  TrackedObservable
} from "configuration-driven-core";
import {StudentConfiguration} from "./student.config";
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: "demo-student",
  template: `
    <div class="m-1" style="border:1px solid black;">
      <div>Student: {{config.name}}</div>
      <div *ngIf="obsReady.behaviorSubject | async">
        My homework to do: {{homework.observable | async}}
        <br>
        I'm charged: $ {{tuition.observable | async}}
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentComponent extends ConfigurationDrivenComponent<StudentConfiguration> implements OnInit {
  homework: TrackedObservable;
  tuition: TrackedObservable;
  obsReady: TrackedBehaviorSubject;

  constructor(private toService: TrackedObjectOrchestrationService, private changeDetectionRef: ChangeDetectorRef) {
    super();
    this.obsReady = new TrackedBehaviorSubject("StudentComponent.obsReady", new BehaviorSubject<boolean>(false));
  }

  ngOnInit() {
    this.toService.waitFor([this.config.consumingObservables.homework, this.config.consumingObservables.tuition], () => {
      this.homework = this.toService.getObservable(this.config.consumingObservables.homework);
      this.tuition = this.toService.getObservable(this.config.consumingObservables.tuition);
      this.obsReady.behaviorSubject.next(true);
      this.changeDetectionRef.detectChanges();
    });
  }
}
