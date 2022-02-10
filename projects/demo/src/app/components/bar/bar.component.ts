import {
  ConfigurationDrivenComponent,
  TrackedBehaviorSubject,
  TrackedObjectOrchestrationService,
  TrackedObservable
} from "configuration-driven-core";
import {BarConfiguration} from "./bar.config";
import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: "demo-bar",
  template: `
    <div>Bar: {{config.text}}</div>
    <div *ngIf="obsReady.behaviorSubject | async">dynamic text: {{dynamicText.observable | async}}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarComponent extends ConfigurationDrivenComponent<BarConfiguration> implements OnInit {
  dynamicText: TrackedObservable;
  obsReady: TrackedBehaviorSubject;

  constructor(private toService: TrackedObjectOrchestrationService) {
    super();
    this.obsReady = new TrackedBehaviorSubject("BarComponent.obsReady" + this, new BehaviorSubject<boolean>(false));
  }

  ngOnInit() {
    this.toService.waitFor([this.config.consumingObservables.dynamic_text], () => {
      this.dynamicText = this.toService.getObservable(this.config.consumingObservables.dynamic_text);
      this.obsReady.behaviorSubject.next(true);
    })
  }
}
