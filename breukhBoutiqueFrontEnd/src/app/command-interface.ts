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


export interface SuccessLogin {
  token: string
  user: User
}


export interface User {
  id: number
  name: string
  email: string
  username: string
  photo:string
  succursales_id: string
  created_at: string
  updated_at: string
}


export interface all {
  marque: Marque[]
  categorie: Categorie[]
  caracteristique: Caracteristique[]
}

export interface Marque {
  id: number
  libelle: string
  created_at: any
  updated_at: any
}

export interface Categorie {
  id: number
  libelle: string
  created_at: any
  updated_at: any
}

export interface Caracteristique {
  id: number
  libelle: string
  valeurs?: string
  unite?: string
  created_at: string
  updated_at: string
}


export interface AddProduit {
  produit: Produit2
  produit_succursales: boolean
  caracteristiques: Caracteristique[]
}

export interface Produit2 {
  libelle: string
  code: string
  photo: string
  marque_id: number
  categorie_id: number
  updated_at: string
  created_at: string
  id: number
}


export interface Root {
  libelle: string
  code: string
  photo: string
  marque_id: number
  categorie_id: number
  prix: number
  quantite: number
  succursales_id: number
  produit_caracteristiques: ProduitCaracteristique[]
}

export interface ProduitCaracteristique {
  caracteristique_id: number
  valeur: string
  unite: string
}

