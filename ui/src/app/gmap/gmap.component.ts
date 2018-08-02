import { Component, OnInit, Input, ViewEncapsulation, NgZone, Output, EventEmitter } from '@angular/core';
import { HttpModule, Http, Response, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.css']
})
export class GmapComponent implements OnInit {
  sub;
  riskDataPoints = [];
  payloadBody;

  constructor(private http: Http, private router: Router, 
                private route: ActivatedRoute, private _appService: AppService) { }

  ngOnInit() {
  }

  onMapReady(map) {
    this.sub = Observable.interval(3000)
    .subscribe((val) => {
      this.http.get(environment.apiServer + 'api/get_crowd_risk')
      .subscribe((res:any) => {
        if (res) {
          this.riskDataPoints = [];
          this.payloadBody = JSON.parse(res._body)
          this.payloadBody.forEach(element => {
            this.riskDataPoints.push([element['Longitude'], element['Latitude']]);
          });
        }
      }, err => {
          console.log("err")
      });
    }
  }

}
