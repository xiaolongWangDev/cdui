import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild} from "@angular/core";
import {AlertConfiguration} from "./alert.config";
import {ConfigurationDrivenComponent} from "configuration-driven-core";

@Component({
  selector: "demo-alert",
  template: `
    <ngb-alert [type]="config.type" [dismissible]="false">
      <div #dynamic_content></div>
    </ngb-alert>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent extends ConfigurationDrivenComponent<AlertConfiguration> {
  @ViewChild('dynamic_content') inputElement: ElementRef;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.inputElement.nativeElement.innerHTML = this.config.htmlContent ?? this.config.content;
    this.changeDetectorRef.detectChanges();
  }
}
