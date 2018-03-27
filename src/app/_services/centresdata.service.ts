import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../app.config';

@Injectable()
export class CentresDataService {
    constructor(private http: HttpClient) { }

    
    getById(userid: string) {
        return this.http.get(appConfig.apiUrl + '/centresdata/' + userid);
    }

    create(data) {
        return this.http.post(appConfig.apiUrl + '/centresdata/create', data);
    }

    update(data) {
        return this.http.post(appConfig.apiUrl + '/centresdata/update', data);
    }    
}