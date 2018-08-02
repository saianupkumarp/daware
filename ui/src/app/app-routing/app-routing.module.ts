import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GmapComponent } from '../gmap/gmap.component';
// import { LandingPageComponent } from '../landing-page/landing-page.component';

const routes: Routes = [
  // {
  //     path: '',
  //     component: LandingPageComponent,
  // },
  {
    path: 'gmap',
    component: GmapComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
