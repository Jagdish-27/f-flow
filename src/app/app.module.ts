import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FFlowModule } from '@foblex/flow';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, FFlowModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
