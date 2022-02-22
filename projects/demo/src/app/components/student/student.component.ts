import {ConfigurationDrivenComponent, DynamicObservableOrchestrationService} from "configuration-driven-core";
import {StudentConfiguration} from "./student.config";
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";

@Component({
  selector: "demo-student",
  template: `
    <div class="m-1" style="border:1px solid black;">
      <div>Student: {{config.name}}</div>
      <div *ngIf="obsReady$ | async">
        My homework to do: {{homework$ | async}}
        <br>
        I'm charged: $ {{tuition$ | async}}
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentComponent extends ConfigurationDrivenComponent<StudentConfiguration> implements OnInit {
  homework$: Observable<string>;
  tuition$: Observable<number>;

  constructor(obsService: DynamicObservableOrchestrationService, changeDetectionRef: ChangeDetectorRef) {
    super(obsService, changeDetectionRef);
  }

  protected readyToConsumeObservables() {
    this.homework$ = this.obsService.getObservable(this.config.consumingObservables.homework);
    this.tuition$ = this.obsService.getObservable(this.config.consumingObservables.tuition);
  }
}
