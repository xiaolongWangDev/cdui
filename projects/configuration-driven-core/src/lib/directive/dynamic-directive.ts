import {AfterViewInit, ComponentRef, Directive, Input, OnDestroy, ViewContainerRef} from "@angular/core";
import {AnyConfigurationDrivenComponent} from "../model/types";
import {ComponentConfiguration} from "../component/base/component-configuration";

@Directive({
  selector: "[cdDynamic]"
})
export class DynamicDirective implements AfterViewInit, OnDestroy {
  @Input() cdDynamic: ComponentConfiguration;
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

}
