import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { AppComponent } from './app.component';
import { StarBtnComponent } from './star-btn/star-btn.component';

@NgModule({
  declarations: [
    AppComponent,
    StarBtnComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
