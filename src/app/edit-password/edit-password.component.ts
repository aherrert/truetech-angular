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
  errorMessage: string | null = null; // Variable para almacenar mensaje de error
  successMessage: string | null = null; // Variable para almacenar mensaje de éxito
  imgCargar = { cargarsvg: false }; // Definición de la propiedad imgCargar


  constructor(private enviarEditarPerfilService: PetitionService) {
    this.formulario_data = {
      password: '',
      newPassword: ''
    };
  }
  activarCarga() {
    this.imgCargar.cargarsvg = true; // Activar la carga
  }

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
  }

  editarContrasena() {
    // Agregar el correo electrónico al objeto de datos del formulario
    this.formulario_data.email = this.email;
    this.enviarEditarPerfilService.editarContrasena(this.formulario_data).subscribe(
      (respuesta: any) => {
        console.log("Editar Perfil", respuesta);
        this.successMessage = respuesta.message; // Mensaje de éxito desde el servidor
        window.location.reload();
        this.errorMessage = null; // Limpiar mensaje de error en caso de éxito
        this.imgCargar.cargarsvg = false; // Desactivar la carga después de recibir la respuesta

      },
      (error) => {
        console.error("Editar Perfil", error);
        this.successMessage = null; // Limpiar mensaje de éxito en caso de error
        if (error.status === 401) {
          this.errorMessage = "Datos incompletos o inválidos";
        } if (error.status === 404) {
          this.errorMessage = "Usuario no encontrado";
        } else if (error.status === 400) {
          this.errorMessage = "Ha ocurrido un error inesperado";
        } else {
          this.errorMessage = "Contraseña actual incorrecta";
        }
        this.imgCargar.cargarsvg = false; // Desactivar la carga después de recibir la respuesta
      }
    );
  }
}
