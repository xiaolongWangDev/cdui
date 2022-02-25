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

  protected yieldObservablesFactories(): Record<string, () => Observable<any>> {
    let tuitionObsId = this.config.yieldingObservables.tuition.observableId;
    return {
      [tuitionObsId]: () => markAsTracked(
        fromEvent(this.inputElement.nativeElement, 'change').pipe(map((e: any) => e.target.value)),
        tuitionObsId
      )
    }
  }
}
