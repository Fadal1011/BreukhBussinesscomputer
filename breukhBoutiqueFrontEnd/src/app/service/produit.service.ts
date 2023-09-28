import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddProduit, Produit_Vente, Root, all } from '../command-interface';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http:HttpClient) {}

  All():Observable<all>{
    return this.http.get<all>(`http://127.0.0.1:8000/api/all`);
  }


  add(add_produit:Root):Observable<AddProduit>{
    return this.http.post<AddProduit>("http://127.0.0.1:8000/api/AjouterProduit",add_produit)
  }
}
