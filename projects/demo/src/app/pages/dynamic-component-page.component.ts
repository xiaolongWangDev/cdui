import {Component} from '@angular/core';

@Component({
  templateUrl: "dynamic-component-page.component.html"
})
export class DynamicComponentPageComponent {
  classCode =
`@Directive({
  selector: "[cdDynamic]"
})
export class DynamicDirective implements AfterViewInit, OnDestroy {
  @Input() cdDynamic: AnyComponentConfiguration;
  private componentRef: ComponentRef<AnyConfigurationDrivenComponent>;

  constructor(private readonly viewContainerRef: ViewContainerRef) {
  }

  ngAfterViewInit(): void {
    this.componentRef = this.viewContainerRef.createComponent(this.cdDynamic.componentType);
    this.componentRef.instance.config = this.cdDynamic;
    this.componentRef.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}`

  blockClassCode =
`@Component({
  selector: "demo-block",
  template: \`
    <div *ngFor="let childConfig of config.components">
      <ng-template [cdDynamic]="childConfig"></ng-template>
    </div>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockComponent extends ConfigurationDrivenComponent<BlockConfiguration> {
}`
}
