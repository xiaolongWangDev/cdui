import {AfterViewInit, Directive, Input, OnDestroy, ViewContainerRef} from "@angular/core";

@Directive({
  selector: "[cdDynamic]"
})
export class DynamicDirective implements AfterViewInit, OnDestroy {
  @Input() cdDynamic: any;
  private componentRef: any;

  constructor(public readonly viewContainerRef: ViewContainerRef) {
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
