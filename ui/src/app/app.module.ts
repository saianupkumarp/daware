import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing/app-routing.module';
// import { LandingPageComponent } from './landing-page/landing-page.component';
import { GmapComponent } from './gmap/gmap.component';
import { NguiMapModule} from '@ngui/map';
import { AppService } from '../app/app.service';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    GmapComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBaAAhzXicbdOmxtSP6caV0B_yZCiBG47M'})
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
