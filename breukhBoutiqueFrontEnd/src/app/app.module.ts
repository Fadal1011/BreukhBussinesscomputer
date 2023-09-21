import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VenteProduitComponent } from './vente-produit/vente-produit.component';
import { CommandeComponent } from './vente-produit/commande/commande.component';
import { SearchProduitComponent } from './vente-produit/search-produit/search-produit.component';
import { ItemCommandeComponent } from './vente-produit/commande/item-commande/item-commande.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    VenteProduitComponent,
    CommandeComponent,
    SearchProduitComponent,
    ItemCommandeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
