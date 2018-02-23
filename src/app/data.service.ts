import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
//import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(public http: Http) { }

    


}
