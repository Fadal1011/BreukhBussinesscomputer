import { Component, Input } from '@angular/core';
import { Vente } from 'src/app/command-interface';


@Component({
  selector: '.app-item-commande',
  templateUrl: './item-commande.component.html',
  styleUrls: ['./item-commande.component.css']
})
export class ItemCommandeComponent {
  @Input() produitCommande!:Vente
}
