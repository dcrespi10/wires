import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { appConfig } from '../app.config';

@Injectable()
export class CrfService {
    constructor(private http: HttpClient) { }

    getCrf(crfName: string) {
        return this.http.post<any>(appConfig.apiUrl + '/crfs/getcrf', { name: crfName })
            .map(crf => {
                return crf;
            });
    }
    update(data) {
        return this.http.post(appConfig.apiUrl + '/crfs/update', data);
    }    
}