import {Component} from '@angular/core';
import {PageConfiguration} from "../components/page/page.config";
import {AlertConfiguration} from "../components/alert/alert.config";

@Component({
  template: `
    <demo-page [config]="config"></demo-page>
  `
})
export class IntroductionPageComponent {
  config = new PageConfiguration({
    title: "Introduction",
    components: [
      new AlertConfiguration({
        type: "success",
        htmlContent: `
        <h3>About this App</h3>
        <p>This application is built with CD (Configuration Driven) framework. Its purpose is to document the core concepts and best practices about how to use the CD framework.</p>
        <h3>What is?</h3>
        <p>As the name implies, the CD framework takes configuration, and let it drive the creation, composition and interaction of dynamically created components.</p>
        <p>By providing only one configuration object from the top level, a tree of Angular components will be generated. Observables are used to direct the dataflow.</p>
        <h3>Why</h3>
        <p>The CD framework makes the relocation/swapping of widgets really quick and easy, which is good for prototyping or requirements/feedbacks gathering demos.</p>
        <p>It also enables you to allow your user to customize their pages. They could change the pages to the way most useful to themselves.</p>

        <h3>Easy to create ~~ Easy to adopt</h3>
        <p>The framework did not and does not intent to write its own components' library,
        as already available from frameworks like: Bootstrap, Angular material.
        Instead, as long as a component is well written, it's easy to make it configuration driven.</p>
        <p>This application chose to "CD-ify" selected components from Bootstrap, HighCharts and AG grid
        in order to have just enough to build the application itself.</p>
        <p>On the other hand, you don't need to go all in by one shot. You can, for example,
        start with a new page in your existing application. Then, turn the rest around overtime. (Or leave them as is)</p>
`
      })
    ]
  })
}
