import {
  ConfigurationDrivenComponent,
  DynamicObservableOrchestrationService,
  markAsTracked
} from "configuration-driven-core";
import {PenPalConfig} from "./pen-pal.config";
import {fromEvent, Observable} from "rxjs";
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild} from "@angular/core";
import {map} from "rxjs/operators";


@Component({
  selector: "demo-pen-pal",
  template: `
    <div class="m-1" style="border:1px solid black;">
      <div>My name is: {{config.name}}</div>
      <div *ngIf="obsReady$ | async">
        Latest mail from my pen pal: {{newLetter$ | async}}
      </div>
      <div>
        <textarea #mail_out rows="3"></textarea>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PenPalComponent extends ConfigurationDrivenComponent<PenPalConfig> {
  newLetter$: Observable<string>;
  @ViewChild('mail_out', {static: true}) domElement: ElementRef;

  constructor(obsService: DynamicObservableOrchestrationService,
              changeDetectionRef: ChangeDetectorRef) {
    super(obsService, changeDetectionRef);
  }

  protected readyToConsumeObservables() {
    this.newLetter$ = this.obsService.getObservable(this.config.consumingObservables.receive);
  }

  protected readyToYieldObservables(): Record<string, Observable<any>> {
    // this is convoluted because of the use of markAsTracked. In production, we don't need to use them.
    // They are just here to aggressively track all observables we created including the intermediate ones
    // so that we are very sure no observable created by us is leaking memory
    let sendOutObsId = this.config.yieldingObservables.sendOut;
    const sendOutObs =
      markAsTracked(
        markAsTracked(
          fromEvent(this.domElement.nativeElement, 'change'),
          sendOutObsId + "_from_event")
          .pipe(map((e: any) => e.target.value)),
        sendOutObsId
      );
    return {[sendOutObsId]: sendOutObs}
  }

}
