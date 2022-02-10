import {
  ConfigurationDrivenComponent,
  TrackedObjectOrchestrationService,
  TrackedObservable
} from "configuration-driven-core";
import {AfterViewInit, Component, ElementRef, ViewChild} from "@angular/core";
import {FooConfiguration} from "./foo.config";
import {fromEvent} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: "demo-foo",
  template: `
    <div>Foo: {{config.text}}</div>
    <div>I take an input: <input #foo_input type="text"></div>
  `
})
export class FooComponent extends ConfigurationDrivenComponent<FooConfiguration> implements AfterViewInit {
  @ViewChild('foo_input', {static: true}) inputElement: ElementRef;

  constructor(private readonly toService: TrackedObjectOrchestrationService) {
    super();
  }

  ngAfterViewInit(): void {
    this.toService.addObject(
      new TrackedObservable(
        this.config.yieldingObservables.userInput,
        fromEvent(this.inputElement.nativeElement, 'change')
          .pipe(map((e: any) => e.target.value)))
    );
  }
}
