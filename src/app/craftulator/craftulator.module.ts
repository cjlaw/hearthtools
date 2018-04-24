import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular/main';

import { CraftulatorComponent } from './craftulator.component';
import { CraftulatorRoutingModule } from './craftulator-routing.module';
import { UpdateInventoryComponent } from '../shared/components/grid-cells/update-inventory.component';

@NgModule({
  imports: [
    CommonModule,
    CraftulatorRoutingModule,
    AgGridModule.withComponents([])
  ],
  declarations: [
    CraftulatorComponent,
    UpdateInventoryComponent
  ],
  entryComponents: [UpdateInventoryComponent]
})
export class CraftulatorModule { }
