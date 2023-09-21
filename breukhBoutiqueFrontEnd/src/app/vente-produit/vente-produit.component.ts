import { Component, OnInit, ViewChild} from '@angular/core';
import { SearchProduitService } from '../service/search-produit.service';
import { Data, Produit, Produit_Vente, Vente } from '../command-interface';
import { VenteService } from '../service/vente.service';
import { CommandeComponent } from './commande/commande.component';


@Component({
  selector: 'app-vente-produit',
  templateUrl: './vente-produit.component.html',
  styleUrls: ['./vente-produit.component.css']
})
export class VenteProduitComponent implements OnInit{
  codeProduit!:string;
  produitRetrouver!:Produit;
  ActiveCard!:boolean;
  tabCommande:Vente[]=[];
  totalProduits!:number;
  montantTotalduProduit!:number;
  notifications!:boolean;

  @ViewChild(CommandeComponent, {static: false}) commandeComponent!: CommandeComponent;

  constructor(private searchProduit:SearchProduitService, private venteProduit:VenteService){}
  ngOnInit() {
    // this.searchProduitFunction();
  }


  searchProduitRecupEmit(code:string){
    this.codeProduit = code;
    this.searchProduitFunction();
  }

  searchProduitFunction(){
    this.searchProduit.SearchProduit(1,this.codeProduit).subscribe(
      (data:Data)=>{
        this.ActiveCard = true;
        this.produitRetrouver = data.data
      },
      (error)=>{
        this.ActiveCard = false
      }
    )
  }

  Add_Produit(produit:Vente){
    this.montantTotalduProduit = 0;
    let dataProduit ={
      succursale_produit_id: produit.succursale_produit_id,
      quantite_vendu: produit.quantite_vendu,
      prix_vente:produit.prix_vente
    }
    this.tabCommande.push(dataProduit);
    for(let commande of this.tabCommande){
      let prix = commande.quantite_vendu * commande.prix_vente
      this.montantTotalduProduit += prix;
    }
  }

  TerminerPaiement(recupCommande:Produit_Vente){
    this.venteProduit.VenteProduit(recupCommande).subscribe(
      (data:Produit_Vente)=>{
        this.notifications = true;
        this.tabCommande = [];
        this.commandeComponent.resetFormGroup();
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}



