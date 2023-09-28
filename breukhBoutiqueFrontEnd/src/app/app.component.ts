import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { AuthentificationService } from './service/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'breukhBoutiqueFrontEnd';
  ActiveNavBar = false;

  // @ViewChild(CommandeComponent, {static: false}) commandeComponent!: CommandeComponent;

  constructor(private authService : AuthentificationService){
    if(this.authService.getToken()){
      this.ActiveNavBar = true;
    }
  }

  ngOnInit(): void {
    initFlowbite();
  }
}
