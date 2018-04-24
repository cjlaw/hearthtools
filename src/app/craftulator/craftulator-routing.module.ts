import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CraftulatorComponent } from './craftulator.component';

const routes: Routes = [
    { 
        path: '', 
        component: CraftulatorComponent/*, 
        children: [
            { 
                path: '',
                component: CraftulatorComponent
            }
        ]*/
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CraftulatorRoutingModule { }
