import { Component, OnInit, Input, ViewEncapsulation, NgZone, Output, EventEmitter } from '@angular/core';
import { HttpModule, Http, Response, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  marker = {
    display: true,
    lat: null,
    lng: null,
  };
  ind={
    id: true,
    nationality: null,
    age: null,
    passno:null,
    bp:null,
    hr:null

  }
  sub;
  riskDataPoints = [];
  payloadBody;
  risk_people;
  high_risk_number;
  full_data = [];
  risk_img = [];
  risk_popup_data = [];

  constructor(private http: Http, private router: Router, 
                private route: ActivatedRoute, private _appService: AppService) { }

  ngOnInit() {
    this.http.get(environment.apiServer + 'api/get_crowd_risk')
      .subscribe((res:any) => {
        if (res) {
          this.full_data = JSON.parse(res._body)
          this.risk_people = this.full_data.length
          this.high_risk_number = this.full_data.filter(x=> x['risk_profile']==='HIGH').length;

          // Map related points
          this.riskDataPoints = [];
          this.risk_img = [];
          this.risk_popup_data = []
          this.payloadBody = JSON.parse(res._body)
          this.payloadBody.forEach(element => {
            this.riskDataPoints.push([element['Longitude'], element['Latitude']]);
            this.risk_img.push([element['risk_img']]);
            this.risk_popup_data.push([element['Name'], element['Nationality'], element['Age'], element['Passport Number'], element['BP'], element['Heart Rate']]);
          });
        }
      }, err => {
        console.log("err");
    });
  }

  onMapReady(map) {
    this.sub = Observable.interval(5000)
    .subscribe((val) => {
      this.http.get(environment.apiServer + 'api/get_crowd_risk')
      .subscribe((res:any) => {
        if (res) {
          this.riskDataPoints = [];
          this.risk_img = [];
          this.risk_popup_data = []
          this.payloadBody = JSON.parse(res._body)
          this.payloadBody.forEach(element => {
            this.riskDataPoints.push([element['Longitude'], element['Latitude']]);
            this.risk_img.push([element['risk_img']]);
            this.risk_popup_data.push([element['Name'], element['Nationality'], element['Age'], element['Passport Number'], element['BP'], element['Heart Rate']]);
          });
        }
      }, err => {
          console.log("err");
      });
    });
  }

  showInfoWindow({target: marker}, ind_num) {
    this.sub.unsubscribe();
    console.log(this.risk_popup_data[ind_num]);
    // this.marker.lat = marker.getPosition().lat();
    // this.marker.lng = marker.getPosition().lng();
    this.ind.id=this.risk_popup_data[ind_num][0];
    this.ind.nationality=this.risk_popup_data[ind_num][1];
    this.ind.age=this.risk_popup_data[ind_num][2];
    this.ind.passno=this.risk_popup_data[ind_num][3];
    this.ind.bp=this.risk_popup_data[ind_num][4];
    this.ind.hr=this.risk_popup_data[ind_num][5];

    marker.nguiMapComponent.openInfoWindow('iw', marker);
    // this.infowindow.open(map,ind_num);
  }

  onMapHover(ev){
    this.sub.unsubscribe();
  }

}
