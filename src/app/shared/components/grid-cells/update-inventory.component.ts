import { Component } from "@angular/core";
import { AgRendererComponent } from "ag-grid-angular/main";

@Component({
  selector: 'app-update-inventory',
  template: `<button class="btn btn-success btn-sm" data-action-type="add" [disabled]="params.data.inventory === params.data.max"><i class="fas fa-plus"></i></button>
  <button class="btn btn-danger btn-sm" data-action-type="remove" [disabled]="params.data.inventory === 0"><i class="fas fa-minus"></i></button>`
})
export class UpdateInventoryComponent implements AgRendererComponent {

  private params: any;

  agInit(params: any): void {
    this.params = params;
    this.params.data.max = params.data.rarity.toLowerCase() === 'legendary' ? 1 : 2;
  }

  refresh(params: any): boolean {
    return params;
  }

}
