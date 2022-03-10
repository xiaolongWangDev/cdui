import {Component, Input} from '@angular/core';

@Component({
  selector: 'code-card',
  template: `
    <div class="card mt-2">
      <div class="card-header" (click)="collapse.toggle()" style="text-align: center">
        Code Snippet - Click header to toggle
      </div>
      <div  #collapse="ngbCollapse" [(ngbCollapse)]="isCollapsed">
        <pre prism class="dark" [language]="language" [code]="code"></pre>
      </div>
    </div>`,

})
export class CodeCardComponent {
  @Input() code: string;
  @Input() language: string = "javascript";
  isCollapsed = false;
}
