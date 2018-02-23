import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
//import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';






import { AppComponent } from './app.component';
import { NewComponentComponent } from './new-component/new-component.component';
import {DataService} from './data.service'



@NgModule({
  declarations: [
    AppComponent,
    NewComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
