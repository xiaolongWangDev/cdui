import {ConfigurationDrivenComponent} from "../base/configuration-driven-component";
import {Component, OnInit} from "@angular/core";
import {StoreConfiguration} from "./store.config";
import {DynamicObservableOrchestrationService} from "../../service/tracked-object-orchestration.service";
import {BehaviorSubject} from "rxjs";
import {markAsTracked} from "../../Helper";

@Component({
    selector: "cd-store",
    template: ``
})
export class StoreComponent extends ConfigurationDrivenComponent<StoreConfiguration> implements OnInit {

    constructor(obsService: DynamicObservableOrchestrationService) {
        super(obsService);
    }

    ngOnInit(): void {
        for (const [observableId, initialValue] of Object.entries(this.config.states)) {
            this.obsService.addObservable(observableId, markAsTracked(new BehaviorSubject<any>(initialValue), "store_entry_"+ observableId));
        }
    }

    destroyExtra(): void {
        for (const observableId of Object.keys(this.config.states)) {
            this.obsService.revokeObservable(observableId);
        }
    }

}
