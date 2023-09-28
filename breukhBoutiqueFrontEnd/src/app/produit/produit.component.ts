import { Component, OnInit, ViewChild } from '@angular/core';
import { ProduitService } from '../service/produit.service';
import { Caracteristique, Categorie, Marque, Root } from '../command-interface';
import { AjouterProduitComponent } from './ajouter-produit/ajouter-produit.component';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit{

    @ViewChild(AjouterProduitComponent, {static: false}) ajouterProduitComponent!: AjouterProduitComponent;

  marque!:Marque[];
  categorie!:Categorie[];
  caracteristique!:Caracteristique[];


  constructor(private produitService:ProduitService){}
  ngOnInit(): void {
    this.all()
  }




  all(){
    this.produitService.All().subscribe(
      (data)=>{
        this.marque = data.marque;
        this.categorie = data.categorie;
        this.caracteristique = data.caracteristique
      }
    )
  }

  add(add_produit:Root){
    this.produitService.add(add_produit).subscribe(
      (data)=>{
        this.ajouterProduitComponent.resetForm();
      }
    )
  }
}
