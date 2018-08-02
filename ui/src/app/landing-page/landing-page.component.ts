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

  sub;
  riskDataPoints = [];
  payloadBody;
  risk_people;
  high_risk_number;
  full_data = [];
  risk_img = [];

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
          this.payloadBody = JSON.parse(res._body)
          this.payloadBody.forEach(element => {
            this.riskDataPoints.push([element['Longitude'], element['Latitude']]);
            this.risk_img.push([element['risk_img']]);
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
          this.payloadBody = JSON.parse(res._body)
          this.payloadBody.forEach(element => {
            this.riskDataPoints.push([element['Longitude'], element['Latitude']]);
            this.risk_img.push([element['risk_img']]);
          });
        }
      }, err => {
          console.log("err");
      });
    });
  }

  showInfoWindow(event) {
    console.log(event)
  }

}
