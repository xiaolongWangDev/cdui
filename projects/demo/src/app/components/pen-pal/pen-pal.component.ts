import {ConfigurationDrivenComponent, DynamicObservableOrchestrationService} from "configuration-driven-core";
import {PenPalConfig} from "./pen-pal.config";
import {markAsDemo, setNullAttributes} from "../../helper/Helper";
import {BehaviorSubject, fromEvent, Observable} from "rxjs";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, OnInit,
  ViewChild
} from "@angular/core";
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
export class PenPalComponent extends ConfigurationDrivenComponent<PenPalConfig> implements OnInit, AfterViewInit {
  newLetter$: Observable<string>;
  obsReady$: BehaviorSubject<boolean>;
  @ViewChild('mail_out', {static: true}) domElement: ElementRef;

  constructor(private readonly obsService: DynamicObservableOrchestrationService,
              private readonly changeDetectionRef: ChangeDetectorRef) {
    super();
    this.obsReady$ = new BehaviorSubject<boolean>(false);
  }

  ngOnInit() {
    markAsDemo(this.obsReady$, "obs_ready_" + this.config.name);
    this.obsService.waitFor([this.config.consumingObservables.receive], () => {
      this.newLetter$ = this.obsService.getObservable(this.config.consumingObservables.receive);
      this.obsReady$.next(true);
      this.changeDetectionRef.detectChanges();
    });
  }

  ngAfterViewInit(): void {
    const sendOutObs = markAsDemo(
      markAsDemo(
        fromEvent(this.domElement.nativeElement, 'change'),
        this.config.yieldingObservables.sendOut + "_from_event")
        .pipe(map((e: any) => e.target.value)),
      this.config.yieldingObservables.sendOut
    );

    const keepInStore: Set<string> = new Set(this.config.keepInStore);
    this.obsService.add(this.config.yieldingObservables.sendOut, sendOutObs, keepInStore, this.destroy$);
  }

  destroyExtra(): void {
    const keepInStore: Set<string> = new Set(this.config.keepInStore);
    if (!keepInStore.has(this.config.yieldingObservables.sendOut)) {
      this.obsService.revokeObservable(this.config.yieldingObservables.sendOut);
    }
    setNullAttributes(this);
  }
}
