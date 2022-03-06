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
      <div *ngIf="ready$ | async">
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

  protected setLocalData() {
    this.newLetter$ = this.obsService.getObservable(this.config.consumingObservables.receive);
  }

  protected yieldObservablesFactories(): Record<string, () => Observable<any>> {
    let sendOutObsId = this.config.yieldingObservables.sendOut.observableId;
    return {
      [sendOutObsId]: () => markAsTracked(
        fromEvent(this.domElement.nativeElement, 'change').pipe(map((e: any) => e.target.value)),
        sendOutObsId
      )
    }
  }

}
