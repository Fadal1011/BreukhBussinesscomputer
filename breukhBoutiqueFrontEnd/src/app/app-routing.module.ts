import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VenteProduitComponent } from './vente-produit/vente-produit.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { AuthGuardService } from './service/auth-guard.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AjouterProduitComponent } from './produit/ajouter-produit/ajouter-produit.component';


const routes: Routes = [
  { path: 'vente',canActivate:[AuthGuardService], component: VenteProduitComponent },
  { path: 'produit',canActivate:[AuthGuardService], component: AjouterProduitComponent },
  { path: '', component: AuthentificationComponent },
  // { path: 'nav',component : NavBarComponent,canActivate:[AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
