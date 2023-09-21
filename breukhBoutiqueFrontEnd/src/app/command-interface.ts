export interface Data {
  data: Produit
}

export interface Produit {
  id: number
  libelle: string
  code: string
  succursales: Succursale[]
  caracteristiques: Caracteristique[]
}

export interface Succursale {
  id: number
  nom: string
  adresse: string
  telephone: string
  prix: number
  prix_gros: number
  quantite: number
  succursale_produit_id:number
}

export interface Caracteristique {
  id: number
  libelle: string
  valeur: string
}

export interface Produit_Vente {
  montant: number
  reduction: number
  user_id: number
  client_id: number
  produits: Vente[]
  montant_payer: number
}



export interface Vente{
  libelle_produit?:string
  prix_vente:number
  quantite_vendu: number
  succursale_produit_id:number
}
