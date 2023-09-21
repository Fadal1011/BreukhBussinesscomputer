import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '../command-interface';

@Injectable({
  providedIn: 'root'
})
export class SearchProduitService {

  constructor(private http:HttpClient) {}

  SearchProduit(idSuccursale:number,code:string):Observable<Data>{
    return this.http.get<Data>(`http://127.0.0.1:8000/api/succursales/${idSuccursale}/search/${code}`);
  }
}
