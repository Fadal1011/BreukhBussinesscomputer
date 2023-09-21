import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Produit, Vente } from 'src/app/command-interface';



@Component({
  selector: '.app-search-produit',
  templateUrl: './search-produit.component.html',
  styleUrls: ['./search-produit.component.css']
})
export class SearchProduitComponent implements OnInit{
  @Output() codeProduit = new EventEmitter<string>();
  @Input() produitRecup!:Produit;
  @Input() ActiveCard!:boolean;
  OpenModal:boolean = false;
  VenteProduit!:FormGroup;
  Id!:number;
  @Output() Add_Produit = new EventEmitter<Vente>();

  constructor(private vente:FormBuilder){}

  ngOnInit(){
    this.VenteProduit = this.vente.group({
      libelle_produit:[""],
      prix_vente:[""],
      quantite_vendu:[""],
      succursale_produit_id:[""],
    })
  }

  valideVente(){
    for(let produitSuccursaleId of this.produitRecup.succursales){
      this.Id = produitSuccursaleId.succursale_produit_id
    }
    this.VenteProduit.patchValue({
      libelle_produit:this.produitRecup.libelle,
      succursale_produit_id: this.Id,
    })

    this.Add_Produit.emit(this.VenteProduit.value)
    this.OpenModal = false;
  }


  Open(){
    this.OpenModal=true;
  }

  close(){
    this.OpenModal=false;
  }

  searchProduit(event:Event){
    let code = (event.target as HTMLInputElement).value;
    this.codeProduit.emit(code);
  }
}
