import {ConfigurationDrivenComponent} from "./configuration-driven-component";
import {AnyComponentConfiguration, AnyConfigurationDrivenComponent} from "../../model/types";
import {ChangeDetectorRef, Component, ComponentRef, QueryList, ViewChildren} from "@angular/core";
import {DynamicDirective} from "../../directive/dynamic-directive";
import {DynamicObservableOrchestrationService} from "../../service/tracked-object-orchestration.service";

@Component({template: ``})
export abstract class DynamicHostComponent<CONF_TYPE extends AnyComponentConfiguration>
  extends ConfigurationDrivenComponent<CONF_TYPE> {

  constructor(obsService?: DynamicObservableOrchestrationService,
              changeDetectionRef?: ChangeDetectorRef) {
    super(obsService, changeDetectionRef);
  }

  @ViewChildren(DynamicDirective) private dynamicComponentsPlaceholders: QueryList<DynamicDirective>;
  private dynamicComponentRefs: ComponentRef<AnyConfigurationDrivenComponent>[] = [];

  protected abstract getConfigurations(): AnyComponentConfiguration[];

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    const childConfigurations = this.getConfigurations();
    this.dynamicComponentsPlaceholders.forEach((holder, index) => {
      const childConfig = childConfigurations[index];
      const componentRef = holder.viewContainerRef.createComponent(childConfig.componentType);
      componentRef.instance.config = childConfig;
      componentRef.changeDetectorRef.detectChanges();
      this.dynamicComponentRefs.push(componentRef);
    })
  }

  protected destroyExtra() {
    this.dynamicComponentRefs.forEach(c => c.destroy());
  }
}
