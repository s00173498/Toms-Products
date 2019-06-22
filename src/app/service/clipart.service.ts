import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';

@Injectable({
    providedIn: 'root'
})
//this is to connect with the clipart api
export class ClipartService {
    url: string = "https://openclipart.org/search/json/?query=";
    data: IOpenClipArt;
    constructor(private _http: HttpClient){
    }
    //will return the url used to get the image
        getImageList(imageStr:string): Observable<IOpenClipArt>{
            return this._http.get<IOpenClipArt>(this.url+imageStr);
        }
    }
