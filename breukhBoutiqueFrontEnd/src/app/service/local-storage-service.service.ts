import { Injectable } from '@angular/core';
import { Data, Produit } from '../command-interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {

  constructor() { }
  // Méthode pour obtenir les données à partir du localStorage
  getData(key: string): Produit[] {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  // Méthode pour stocker les données dans le localStorage
  setData(key: string, data: Produit[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }


  removeData(key: string){
    localStorage.removeItem(key);
  }
}
