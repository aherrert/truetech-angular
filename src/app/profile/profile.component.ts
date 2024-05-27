import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  nombre: string | null = '';
  apellidos: string | null = '';
  email: string | null = '';
  editandoNombre: boolean = false;
  editandoApellidos: boolean = false;
  errorMessage: string = '';
  imgCargar = { cargarsvg: false }; // Definición de la propiedad imgCargar


  constructor(private conexHttp: HttpClient, private router: Router) {}
  activarCarga() {
    this.imgCargar.cargarsvg = true; // Activar la carga
  }
  ngOnInit(): void {
    // Obtener la información del usuario del localStorage
    this.nombre = localStorage.getItem('nombre');
    this.apellidos = localStorage.getItem('apellidos');
    this.email = localStorage.getItem('email');
  }

  toggleEdit(campo: string) {
    if (campo === 'nombre') {
      this.editandoNombre = !this.editandoNombre;
    } else if (campo === 'apellidos') {
      this.editandoApellidos = !this.editandoApellidos;
    }
  }

  guardarCambios() {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error("Token no encontrado en el localStorage");
      alert("¡Para editar el perfil primero debes de iniciar sesión!");
      this.router.navigate(['/login']);
      return;
    }
  
    const formulario_data = {
      nombre: this.nombre,
      apellidos: this.apellidos,
      email: this.email,
      token: token
    };
  
    this.conexHttp.post('/usuario/editarPerfil', formulario_data).subscribe(
      (respuesta: any) => {
        console.log("Editar Perfil", respuesta);
        if (respuesta.status === 'OK') {
          console.log("¡Perfil editado correctamente!");
          window.location.reload();
          
          // Actualizar el localStorage con el nuevo nombre y apellidos
          localStorage.setItem('nombre', this.nombre ?? '');
          localStorage.setItem('nombreUsuario', this.nombre ?? ''); // Aquí se almacena el nombre de usuario
          localStorage.setItem('apellidos', this.apellidos ?? '');
        } else {
          this.errorMessage = respuesta.message || "Ocurrió un error al intentar editar el perfil. Por favor, inténtalo de nuevo más tarde.";
        }
        this.imgCargar.cargarsvg = false; // Desactivar la carga después de recibir la respuesta
      },
      (error) => {
        console.error("Editar Perfil", error);
        if (error.status === 401) {
          this.errorMessage = "¡El token es inválido! Por favor, inicia sesión nuevamente.";
          this.router.navigate(['/login']);
        } else if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else if (error.status === 400) {
          this.errorMessage = "Datos incompletos o inválidos.";
        } else if (error.status === 404) {
          this.errorMessage = "Usuario no encontrado.";
        } else {
          this.errorMessage = "Error desconocido. Por favor, inténtalo de nuevo más tarde.";
        }
        this.imgCargar.cargarsvg = false;
      }
    );
  }  
}
