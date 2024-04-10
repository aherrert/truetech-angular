import { Component } from '@angular/core';
import { PetitionService } from '../petition.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  formulario_data: any;

  constructor(private enviarEditarPerfilService: PetitionService) { 
    this.formulario_data = {
      email: '',
      nombre: '',
      apellidos: '',
      password: ''
    };
  }

  enviarEditarPerfil() {
    this.enviarEditarPerfilService.enviarEditarPerfil(this.formulario_data);
  }
}

