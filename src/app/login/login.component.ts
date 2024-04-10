import { Component } from '@angular/core';
import { PetitionService } from '../petition.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formulario_data: any;

  constructor(private iniciosesionService: PetitionService) { 
    this.formulario_data = {
      email: '',
      password: ''
    };
  }

  enviarIniciosesion() {
    this.iniciosesionService.enviarIniciosesion(this.formulario_data);
  }
}
