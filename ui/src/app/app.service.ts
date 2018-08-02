import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AppService {

  constructor(private http: Http, private router: Router, private route: ActivatedRoute) { }
  
  getCrowdRisk(): Observable<any> {
    return this.http.get(environment.apiServer + 'api/get_crowd_risk')
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
