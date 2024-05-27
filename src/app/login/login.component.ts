import { Component } from '@angular/core';
import { PetitionService } from '../petition.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formulario_data: any;
  errorMessage: string = '';
  imgCargar = { cargarsvg: false }; // Definición de la propiedad imgCargar


  constructor(private iniciosesionService: PetitionService, private router: Router) { 
    this.formulario_data = {
      email: '',
      password: ''
    };
  }

  activarCarga() {
    this.imgCargar.cargarsvg = true; // Activar la carga
  }
  
  enviarIniciosesion() {
    this.iniciosesionService.enviarIniciosesion(this.formulario_data).subscribe(
      (respuesta: any) => {
        if (respuesta.status === 'OK' && respuesta.token) {
          localStorage.setItem('token', respuesta.token);
          console.log("Login", respuesta);
          console.log(respuesta.message); // Mensaje de bienvenida

          try {
            const tokenInfo = this.parseJwt(respuesta.token);
            const rol = tokenInfo.rol;
            const nombreUsuario = tokenInfo.nombre;
            const email = tokenInfo.email;
            const nombre = tokenInfo.nombre;
            const apellidos = tokenInfo.apellidos;

            localStorage.setItem('email', email);
            localStorage.setItem('nombre', nombre);
            localStorage.setItem('apellidos', apellidos);
            localStorage.setItem('nombreUsuario', nombreUsuario);

            switch (rol) {
              case 4:
                this.router.navigate(['/home']);
                break;
              case 3:
                this.router.navigate(['/tickets/hardware-worker']);
                break;
              case 2:
                this.router.navigate(['/tickets/software-worker']);
                break;
              case 1:
                this.router.navigate(['/admin']);
                break;
              default:
                this.router.navigate(['/pagina-por-defecto']);
                break;
            }
          } catch (error) {
            console.error("Error al decodificar el token:", error);
            this.errorMessage = "Error al decodificar el token";
          }
        } else {
          this.errorMessage = "Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.";
        }
        this.imgCargar.cargarsvg = false; // Desactivar la carga después de recibir la respuesta
      },
      (error) => {
        console.error("Login", error);
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = "Error de correo electrónico o contraseña no válida";
        }
        this.imgCargar.cargarsvg = false;
      }
    );
  }

  parseJwt(token: string) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }
}
