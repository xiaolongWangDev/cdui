import {Component, Input, OnDestroy} from "@angular/core";
import {AnyComponentConfiguration} from "../../model/types";
import {Subject} from "rxjs";

@Component({template: ``})
export abstract class ConfigurationDrivenComponent<CONF_TYPE extends AnyComponentConfiguration> implements OnDestroy {
  @Input() config: CONF_TYPE;
  protected readonly destroy$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroyExtra();
  }

  abstract destroyExtra(): void;
}
