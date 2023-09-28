import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Caracteristique, Categorie, Marque, Root } from 'src/app/command-interface';

@Component({
  selector: 'app-ajouter-produit',
  templateUrl: './ajouter-produit.component.html',
  styleUrls: ['./ajouter-produit.component.css']
})
export class AjouterProduitComponent {
  ajouter_produit!: FormGroup;
  typeCaracteristique:string[] = [];
  activeInputIndex!:number;

  champActive:number[]=[];
  chargeSelctValeur:string[][] = [];
  chargeSelctUnite:string[][] = [];

  @Input() marque!:Marque[];
  @Input() categorie!:Categorie[];
  @Input() caracteristiqueProduit!:Caracteristique[];


  @Output() output_Add_produit = new EventEmitter<Root>();



  constructor(private formBuilder: FormBuilder) { }


  ngOnInit() {
    // Initialisation du formulaire et chargement des données
    this.ajouter_produit = this.formBuilder.group({
      libelle:[''],
      code:[''],
      marque_id:[''],
      categorie_id:[''],
      prix:[''],
      quantite:[''],
      succursales_id:[1],
      produit_caracteristiques: this.formBuilder.array([]),
      photo: ["https://www.lifewire.com/thmb/tHjH9M19MsA9gFY-qcZvKYv5oG4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/cloud-upload-a30f385a928e44e199a62210d578375a.jpg", Validators.required],

    });

  }

  get produit_caracteristiques() {
    return (this.ajouter_produit.get('produit_caracteristiques') as FormArray).controls as FormGroup[];
  }

  get photo() {
    return this.ajouter_produit.get('photo')
  }

  get libelle(){
    return this.ajouter_produit.get('libelle');
  }


  selectCategorie(event: Event) {
    let target = event.target as HTMLInputElement;
    let categorieValue = target.value;
    this.activeInputIndex = +target.id;
    this.typeCaracteristique[this.activeInputIndex] = categorieValue;
     for (let caracteristique of this.caracteristiqueProduit){
        if(+categorieValue === caracteristique.id && caracteristique.unite !=null && caracteristique.valeurs!=null){
          this.champActive[this.activeInputIndex] = 3;
          this.chargeSelctValeur[this.activeInputIndex] = caracteristique.valeurs.split(',');
          this.chargeSelctUnite[this.activeInputIndex] = caracteristique.unite.split(',');
          console.log(caracteristique);

        }

        if(+categorieValue === caracteristique.id && caracteristique.unite ==null && caracteristique.valeurs!=null){
          this.champActive[this.activeInputIndex] = 2;
          this.chargeSelctValeur[this.activeInputIndex] = caracteristique.valeurs.split(',');
          console.log(caracteristique);

        }

        if(+categorieValue === caracteristique.id && caracteristique.unite ==null && caracteristique.valeurs==null){
          this.champActive[this.activeInputIndex] = 1;
          console.log(caracteristique);
        }
     }
  }


  // Ajout d'une nouvelle ligne au tableau d'articles
  addColumncontrol() {
    const newArticle = this.formBuilder.group({
      caracteristique_id:["",Validators.required],
      valeur:[null,Validators.required],
      unite:[null],

    });
    const produit_caracteristiquesArray = this.ajouter_produit.get('produit_caracteristiques') as FormArray;
    produit_caracteristiquesArray.push(newArticle);
  }




  removeItem(index: number) {
    const formArray = this.ajouter_produit.get('produit_caracteristiques') as FormArray;
    formArray.removeAt(index);

  }



  AddProduit(){
    console.log(this.ajouter_produit.value);
    this.output_Add_produit.emit(this.ajouter_produit.value)
  }


  resetForm() {
    this.ajouter_produit.reset({
      libelle: '',
      code: '',
      marque_id: '',
      categorie_id: '',
      prix: '',
      quantite: '',
      succursales_id: 1,
      produit_caracteristiques: this.formBuilder.array([]),
      photo: "https://www.lifewire.com/thmb/tHjH9M19MsA9gFY-qcZvKYv5oG4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"
    });
  }





  // Gestionnaire de changement de fichier
  onFileChange(event: Event) {
    const filesTarget = event.target as HTMLInputElement;
    if (filesTarget.files) {
      const file = filesTarget.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent) => {
          if (e.target) {
            this.photo?.setValue(reader.result)
            // this.ajouter_produit
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }


}
