import {ConfigurationDrivenComponent, DynamicObservableOrchestrationService,} from "configuration-driven-core";
import {StudentConfiguration} from "./student.config";
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {setNullAttributes, markAsDemo} from "../../helper/Helper";

@Component({
  selector: "demo-student",
  template: `
    <div class="m-1" style="border:1px solid black;">
      <div>Student: {{config.name}}</div>
      <div *ngIf="obsReady | async">
        My homework to do: {{homework | async}}
        <br>
        I'm charged: $ {{tuition | async}}
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentComponent extends ConfigurationDrivenComponent<StudentConfiguration> implements OnInit, OnDestroy {
  homework: Observable<string>;
  tuition: Observable<number>;
  obsReady: BehaviorSubject<boolean>;

  constructor(private obsService: DynamicObservableOrchestrationService, private changeDetectionRef: ChangeDetectorRef) {
    super();
    this.obsReady = new BehaviorSubject<boolean>(false);
  }

  ngOnInit() {
    markAsDemo(this.obsReady, "obs_ready_" + this.config.name);
    this.obsService.waitFor([this.config.consumingObservables.homework, this.config.consumingObservables.tuition], () => {
      this.homework = this.obsService.getObservable(this.config.consumingObservables.homework);
      this.tuition = this.obsService.getObservable(this.config.consumingObservables.tuition);
      this.obsReady.next(true);
      this.changeDetectionRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    setNullAttributes(this);
  }
}
