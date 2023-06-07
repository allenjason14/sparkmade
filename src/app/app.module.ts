import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NameSettingsComponent } from './name-settings/name-settings.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdvancedSettingsComponent } from './advanced-settings/advanced-settings.component';
import { ResultsFormComponent } from './results-form/results-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NameSettingsComponent,
    HomeComponent,
    AdvancedSettingsComponent,
    ResultsFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
