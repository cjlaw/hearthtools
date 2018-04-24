import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './../app-routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  declarations: [
    HomeComponent,
    NavbarComponent
  ],
  exports: [
    AppRoutingModule,
    NavbarComponent
  ]
})
export class CoreModule { }
