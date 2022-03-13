import {ChangeDetectionStrategy, Component} from "@angular/core";
import {AnyComponentConfiguration, ConfigurationDrivenComponent, markAsTracked,} from "configuration-driven-core";
import {TabConfiguration} from "./tab.config";
import {BehaviorSubject, Observable} from "rxjs";
import {distinctUntilChanged, takeUntil} from "rxjs/operators";

@Component({
  selector: "demo-tab",
  template: `
    <ng-container *ngIf="ready$ | async">
      <ul ngbNav #nav="ngbNav" [activeId]="activeTab$ | async" (navChange)="activeTab$.next($event.nextId)"
          class="nav-tabs">
        <li *ngFor="let label of config.tabLabels; let i = index" [ngbNavItem]="i + 1">
          <a ngbNavLink>{{label}}</a>
          <ng-template ngbNavContent>
            <ng-template [cdDynamic]="config.components[i]"></ng-template>
          </ng-template>
        </li>
      </ul>
      <div [ngbNavOutlet]="nav" class="mt-2"></div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent extends ConfigurationDrivenComponent<TabConfiguration> {
  activeTab$: BehaviorSubject<string | number> = markAsTracked(new BehaviorSubject<string | number>(1), "active_tab_TabComponent");

  protected getConfigurations(): AnyComponentConfiguration[] {
    return this.config.components;
  }

  protected setLocalData(): void {
    if (this.config.consumingObservables.activeTab !== undefined) {
      this.obsService.getObservable(this.config.consumingObservables.activeTab)
        .pipe(takeUntil(this.destroy$))
        .subscribe(val => {
          if (val !== this.activeTab$.getValue()) {
            this.activeTab$.next(val)
          }
        });
    }
  }

  protected yieldObservablesFactories(): Record<string, () => Observable<any>> {
    return {
      [this.config.yieldingObservables.activeTab.observableId]: () => this.activeTab$.pipe(distinctUntilChanged())
    }
  }
}
