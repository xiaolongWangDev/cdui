import {ConfigurationDrivenComponent} from "../base/configuration-driven-component";
import {Component, OnInit} from "@angular/core";
import {StoreConfiguration} from "./store.config";
import {DynamicObservableOrchestrationService} from "../../service/tracked-object-orchestration.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: "cd-store",
  template: ``
})
export class StoreComponent extends ConfigurationDrivenComponent<StoreConfiguration> implements OnInit {

  constructor(private readonly obsService: DynamicObservableOrchestrationService) {
    super();
  }

  ngOnInit(): void {
    for (const [observableId, initialValue] of Object.entries(this.config.states)) {
      this.obsService.addObservable(observableId, new BehaviorSubject<any>(initialValue));
    }
  }

  destroyExtra(): void {
    for (const observableId of Object.keys(this.config.states)) {
      this.obsService.revokeObservable(observableId);
    }
  }

}
