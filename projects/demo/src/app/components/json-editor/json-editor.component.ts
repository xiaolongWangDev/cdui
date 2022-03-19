import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from "@angular/core";
// @ts-ignore
import * as JSONEditor from 'jsoneditor';

@Component({
  selector: "demo-json-editor",
  template: `
    <div class="card mt-2 mb-2">
      <div class="card-header" (click)="collapse.toggle()">
        Configuration Editor
        <button class="btn-primary" (click)="fireConfigChange($event);">Render</button>
      </div>
      <div #collapse="ngbCollapse" [(ngbCollapse)]="isCollapsed">
        <div #json_editor style="width: 100%; height: 500px;"></div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JsonEditorComponent implements AfterViewInit {
  @Input() configCode: object = {};
  @Output() configCodeChange = new EventEmitter<object>();
  @ViewChild('json_editor') domElement: ElementRef;

  isCollapsed: boolean;
  private editor: JSONEditor;

  ngAfterViewInit(): void {
    const container = this.domElement.nativeElement
    const options = {
      modes: ["code", "tree"]
    }
    this.editor = new JSONEditor(container, options)
    this.editor.set(this.configCode);
  }

  fireConfigChange($event: any){
    try {
      this.configCodeChange.emit(this.editor.get())
    } catch (e){
      console.log("invalid json", e)
      this.configCodeChange.emit(null);
    }
    $event.stopPropagation();
  }
}
