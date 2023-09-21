import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit_Vente } from '../command-interface';

@Injectable({
  providedIn: 'root'
})
export class VenteService {

  constructor(private http:HttpClient) {}

  VenteProduit(ObjectProduit:Produit_Vente):Observable<Produit_Vente>{
    return this.http.post<Produit_Vente>(`http://127.0.0.1:8000/api/commande`,ObjectProduit)
  }
}
