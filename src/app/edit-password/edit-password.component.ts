import { Component } from '@angular/core';
import { PetitionService } from '../petition.service';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent {
  formulario_data: any;
  email: string | null = '';

  constructor(private enviarEditarPerfilService: PetitionService) { 
    this.formulario_data = {
      password: '',
      newPassword: ''
    };
  }

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
  }

  editarContrasena() {
    // Agregar el correo electrónico al objeto de datos del formulario
    this.formulario_data.email = this.email;
    this.enviarEditarPerfilService.editarContrasena(this.formulario_data);
  }
}
