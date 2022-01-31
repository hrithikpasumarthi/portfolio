import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse,HttpHeaders} from  '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class InterfaceService {

  constructor(private http:HttpClient) { }

  getcredentials(a:any)
  {
    return this.http.get("http://localhost:3000/credentials/"+a.id);
  }

  addcredentials(a:any)
  {
    
    let options = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post("http://localhost:3000/credentials",a,{headers:options});
  }

  addportfoliodata (a:any)
  {
    let options = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post("http://localhost:3000/data",a,{headers:options});
  }

  getportfoliodata (a:any)
  {
    return this.http.get('http://localhost:3000/data/'+a)
  }

  updateportfoliodata (a:any)
  {
    let options = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.put('http://localhost:3000/data/'+a.id,a,{headers:options})
  }
}
