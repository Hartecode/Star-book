import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { AppComponent } from './app.component';
import { StarBtnComponent } from './star-btn/star-btn.component';
import { StarBundleComponent } from './star-bundle/star-bundle.component';

@NgModule({
  declarations: [
    AppComponent,
    StarBtnComponent,
    StarBundleComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
