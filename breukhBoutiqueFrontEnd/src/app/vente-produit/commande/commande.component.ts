import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Produit_Vente, Vente } from 'src/app/command-interface';




@Component({
  selector: '.app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit{
  @Input() tabAfficheCommande!:Vente[]
  @Input() tabCommande!:Vente[];
  @Input() totalProduits!:number;

  CalculMontant!:FormGroup;
  paiementCommande!:FormGroup;
  @Input() montantTotalduProduit!:number;
  valeurInitialeMontantTotal!: number;
  montantAremis!:number;
  @Output() commandeEnd = new EventEmitter<Produit_Vente>();
  @Input() notification!:boolean;

  openModal!:boolean;

  openModalFunc(){
    console.log("sdfcdfcfqsd");

    this.openModal =true
  }

  closeModalFunc(){
    this.openModal =false;
  }



  constructor(private montant:FormBuilder,private paiement:FormBuilder){}
  ngOnInit(){
    this.CalculMontant = this.montant.group({
      reduction: 0,
      montant:0,
    });

    this.paiementCommande = this.paiement.group({
      montant_payer:[''],
    })
  }

    calculeRemise(event: Event) {
      let pourcentageRemise = +(event.target as HTMLInputElement).value;
      let remise = pourcentageRemise / 100;

      // Vérifier si la valeur initiale du montant total n'a pas encore été stockée
      if (this.valeurInitialeMontantTotal === undefined) {
        this.valeurInitialeMontantTotal = this.montantTotalduProduit;
      }

      // Réinitialiser le montant total à sa valeur initiale
      this.montantTotalduProduit = this.valeurInitialeMontantTotal;

      // Calculer le montant de la remise
      let montantDeRemise = this.montantTotalduProduit * remise;
      // Soustraire le montant de la remise du montant total
      this.montantTotalduProduit -= montantDeRemise;
    }


  calculeMontantDonnee(event: Event){
    let montant = +(event.target as HTMLInputElement).value;
    this.montantAremis = montant - this.montantTotalduProduit
  }

  TerminerLePaiement(){
    let EnvoieCommand = {
      montant: this.montantTotalduProduit,
      reduction: this.CalculMontant.get('reduction')?.value,
      user_id: 1,
      client_id: 2,
      produits:this.tabCommande,
      montant_payer:this.paiementCommande.get('montant_payer')?.value
    }
    this.commandeEnd.emit(EnvoieCommand)
  }

  closeNotification(){
    this.notification = false;
  }

  resetFormGroup(){
    this.CalculMontant.reset();
    this.paiementCommande.reset();
    this.montantTotalduProduit = 0;
  }
}
