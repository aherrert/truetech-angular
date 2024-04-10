import { Component } from '@angular/core';
import { PetitionService } from '../petition.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formulario_data: any;

  constructor(private registroService: PetitionService) { 
    this.formulario_data = {
      nombre: '',
      apellidos: '',
      email: '',
      password: ''
    };
  }

  enviarRegistro() {
    this.registroService.enviarRegistro(this.formulario_data);
  }
}
