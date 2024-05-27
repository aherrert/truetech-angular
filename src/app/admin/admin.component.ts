import { Component } from '@angular/core';
import { PetitionService } from '../petition.service';
import { Router } from '@angular/router';


class Usuario {
  id: number = 0;
  nombre: string = "";
  apellidos: string = "";
  email: string = "";
  password: string = "";
  id_cargo: number = 0;
}
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  usuarios: Usuario[] = []; // Define una propiedad para almacenar los usuarios
  formulario_data: any;
  id: number | undefined;
  errorMessage: string | undefined; // Agrega la variable errorMessage
  errorMessage2: string | undefined; // Agrega la variable errorMessage
  imgCargar = { cargarsvg: false }; // Definición de la propiedad imgCargar


  constructor(private enviarUsuarioAdmin: PetitionService, private router: Router,) {
    this.formulario_data = {
      nombre: '',
      apellidos: '',
      email: '',
      password: '',
      cargo: '' // Agrega la variable para almacenar la imagen seleccionada
    };
    this.id = undefined; // Initialize id property
  }

  activarCarga() {
    this.imgCargar.cargarsvg = true; // Activar la carga
  }

  agregarUsuario() {
    this.enviarUsuarioAdmin.enviarRegistro_Admin(this.formulario_data).subscribe(
      (respuesta: any) => {
        if (respuesta.status !== 'OK') {
          // Si la respuesta no es 'OK', asigna el mensaje de error a errorMessage
          this.errorMessage = "Error en el registro: " + respuesta.message;
        }
        this.imgCargar.cargarsvg = false; // Desactivar la carga después de recibir la respuesta
      },
      (error: any) => {
        console.error("Error en la solicitud:", error);
        let errorMessage = "Ocurrió un error en el servidor.";

        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else if (error.status === 0) {
          errorMessage = "No se pudo conectar al servidor. Por favor, compruebe su conexión a internet.";
        } else if (error.status === 401) {
          errorMessage = "No tienes permiso para realizar esta acción.";
        } else if (error.status === 403) {
          errorMessage = "El token ha expirado.";
          this.router.navigate(['/admin']);
        } else if (error.status === 409) { // Agregar este bloque para manejar el error 409 Conflict
          errorMessage = "El correo electrónico ya está en uso.";
        }
        // Asigna el mensaje de error a errorMessage
        this.errorMessage = errorMessage;
        this.imgCargar.cargarsvg = false; // Desactivar la carga después de recibir la respuesta
      }
      
    );
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.enviarUsuarioAdmin.obtenerUsuarios().subscribe(
      (respuesta: any) => {
        console.log("Usuarios", respuesta);
        this.usuarios = respuesta["usuarios"];
      },
      (error) => {
        console.error("Error al obtener usuarios", error);
      }
    );
  }
  eliminarUsuarios() {
    console.log("ID to delete:", this.id); // Check if ID is set correctly
    if (this.id !== undefined) {
      const formulario_data = {
        id: this.id,
      };
      console.log("Form data:", formulario_data); // Check form data
      this.enviarUsuarioAdmin.eliminarUsuarios(formulario_data).subscribe(
        (respuesta: any) => {
          if (respuesta.status !== 'OK') {
            // Si la respuesta no es 'OK', asigna el mensaje de error a errorMessage2
            this.errorMessage2 = "Error al eliminar usuario: " + respuesta.message;
          }
          this.imgCargar.cargarsvg = false; // Desactivar la carga después de recibir la respuesta
        },
        (error: any) => {
          console.error("Error en la solicitud:", error);
          let errorMessage = "Ocurrió un error en el servidor.";

          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          } else if (error.status === 0) {
            errorMessage = "No se pudo conectar al servidor. Por favor, compruebe su conexión a internet.";
          } else if (error.status === 401) {
            errorMessage = "No tienes permiso para realizar esta acción.";
          } else if (error.status === 403) {
            errorMessage = "El token ha expirado.";
            this.router.navigate(['/admin']);
          }
          // Asigna el mensaje de error a errorMessage2
          this.errorMessage2 = errorMessage;
          this.imgCargar.cargarsvg = false; // Desactivar la carga después de recibir la respuesta
        }
      );
    }
  }
}
