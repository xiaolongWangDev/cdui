import {ConfigurationDrivenComponent, DynamicObservableOrchestrationService,} from "configuration-driven-core";
import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild} from "@angular/core";
import {fromEvent} from "rxjs";
import {map} from "rxjs/operators";
import {HeadmasterConfiguration} from "./headmaster.config";
import {markAsDemo, setNullAttributes} from "../../helper/Helper";

@Component({
  selector: "demo-headmaster",
  template: `
    <div>
      <div>Headmaster: My name is {{config.name}}</div>
      <div>I'll charge you <input #collect_tuition_input type="number"></div>
      <div *ngFor="let teacherConf of config.manages">
        <demo-teacher [config]="teacherConf"></demo-teacher>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeadmasterComponent extends ConfigurationDrivenComponent<HeadmasterConfiguration> implements AfterViewInit {
  @ViewChild('collect_tuition_input', {static: true}) inputElement: ElementRef;

  constructor(private readonly obsService: DynamicObservableOrchestrationService) {
    super();
  }

  ngAfterViewInit(): void {
    let tuition_observable_id = this.config.yieldingObservables.tuition;
    this.obsService.addObservable(
      tuition_observable_id,
      markAsDemo(
        markAsDemo(fromEvent(this.inputElement.nativeElement, 'change'), tuition_observable_id + "_from_event")
          .pipe(map((e: any) => e.target.value)),
        tuition_observable_id
      )
    );
  }


  destroyExtra(): void {
    this.obsService.revokeObservable(this.config.yieldingObservables.tuition);
    setNullAttributes(this);
  }

}
