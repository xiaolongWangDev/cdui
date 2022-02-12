import {
  ConfigurationDrivenComponent,
  TrackedObjectOrchestrationService,
  TrackedObservable
} from "configuration-driven-core";
import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild} from "@angular/core";
import {fromEvent} from "rxjs";
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
export class HeadmasterComponent extends ConfigurationDrivenComponent<HeadmasterConfiguration> implements AfterViewInit, OnDestroy {
  @ViewChild('collect_tuition_input', {static: true}) inputElement: ElementRef;

  constructor(private readonly toService: TrackedObjectOrchestrationService) {
    super();
  }

  ngAfterViewInit(): void {
    this.toService.addObject(
      new TrackedObservable(
        this.config.yieldingObservables.tuition,
        fromEvent(this.inputElement.nativeElement, 'change')
          .pipe(map((e: any) => e.target.value)))
    );
  }

  ngOnDestroy(): void {
    this.toService.revokeObject(this.config.yieldingObservables.tuition);
  }

}
