import {
  ConfigurationDrivenComponent,
  DynamicObservableOrchestrationService,
  markAsTracked
} from "configuration-driven-core";
import {ChangeDetectionStrategy, Component, ElementRef, ViewChild} from "@angular/core";
import {fromEvent, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HeadmasterConfiguration} from "./headmaster.config";

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
export class HeadmasterComponent extends ConfigurationDrivenComponent<HeadmasterConfiguration> {
  @ViewChild('collect_tuition_input', {static: true}) inputElement: ElementRef;

  constructor(obsService: DynamicObservableOrchestrationService) {
    super(obsService);
  }

  protected readyToYieldObservables(): Record<string, Observable<any>> {
    let tuitionObsId = this.config.yieldingObservables.tuition;
    // this is convoluted because of the use of markAsTracked. In production, we don't need to use them.
    // They are just here to aggressively track all observables we created so that we
    // are very sure no observable created by us is leaking memory
    const tuitionObs = markAsTracked(
      fromEvent(this.inputElement.nativeElement, 'change').pipe(map((e: any) => e.target.value)),
      tuitionObsId
    );

    return {[tuitionObsId]: tuitionObs}
  }
}
