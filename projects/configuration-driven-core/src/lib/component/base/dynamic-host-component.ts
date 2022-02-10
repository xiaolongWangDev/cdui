import {ConfigurationDrivenComponent} from "./configuration-driven-component";
import {AnyComponentConfiguration, AnyConfigurationDrivenComponent} from "../../model/types";
import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  QueryList,
  ViewChildren
} from "@angular/core";
import {DynamicDirective} from "../../directive/dynamic-directive";

@Component({template: ``})
export abstract class DynamicHostComponent<CONF_TYPE extends AnyComponentConfiguration>
  extends ConfigurationDrivenComponent<CONF_TYPE>
  implements AfterViewInit, OnDestroy {

  @ViewChildren(DynamicDirective) private dynamicComponentsPlaceholders: QueryList<DynamicDirective>;
  private dynamicComponentRefs: ComponentRef<AnyConfigurationDrivenComponent>[] = [];

  constructor(private _resolver: ComponentFactoryResolver) {
    super();
  }

  protected abstract getConfigurations(): AnyComponentConfiguration[];

  ngAfterViewInit(): void {
    const childConfigurations = this.getConfigurations();
    this.dynamicComponentsPlaceholders.forEach((holder, index) => {
      const childConfig = childConfigurations[index];
      const componentFactory = this._resolver.resolveComponentFactory(childConfig.componentType);
      const componentRef = holder.viewContainerRef.createComponent(componentFactory);
      componentRef.instance.config = childConfig;
      componentRef.changeDetectorRef.detectChanges();
      this.dynamicComponentRefs.push(componentRef);
    })
  }

  ngOnDestroy(): void {
    this.dynamicComponentRefs.forEach(c => c.destroy());
  }
}
