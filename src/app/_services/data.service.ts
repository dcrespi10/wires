import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../app.config';

@Injectable()
export class DataService {
    url: string;
    constructor(private http: HttpClient) {}

    setCollectionName(collectionName: string){
        this.url = appConfig.apiUrl + '/'+ collectionName;
    }
    
    getCollection(userid: string, moduleName: string){
        return this.http.get(this.url + '/' + userid);
    }

    getById(userid: string) {
        return this.http.get(this.url + '/' + userid);
    }

    getByIdFromCollection(userid: string, admissionid:string) {
        return this.http.get(this.url + '/' + userid + "/" + admissionid);
    }

    create(data) {
        return this.http.post(this.url + '/create', data);
    }

    update(data) {
        return this.http.post(this.url + '/update', data);
    }    
}