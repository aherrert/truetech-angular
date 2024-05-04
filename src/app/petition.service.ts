import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PetitionService {

  constructor(private router: Router, private conexHttp: HttpClient, private http: HttpClient) { }

  enviarRegistro(formulario_data: any) {
    this.conexHttp.post('/usuario/registro', formulario_data).subscribe(
      (respuesta: any) => {
        if (respuesta.status === 'OK') {
          console.log("Registro", respuesta);
          alert("¡Registro exitoso!");
          this.router.navigate(['/login']);
        } else {
          alert("Ocurrió un error al intentar registrar. Por favor, inténtalo de nuevo más tarde.");
        }
      },
      (error) => {
        console.error("Registro", error);
        alert("Usuario existente con el mismo correo electrónico");
      }
    );
  }

  enviarIniciosesion(formulario_data: any) {
    this.conexHttp.post('/usuario/login', formulario_data).subscribe(
      (respuesta: any) => {
        if (respuesta.status === 'OK' && respuesta.token) {
          localStorage.setItem('token', respuesta.token);
          console.log("Login", respuesta);
          alert("¡Inicio de sesión exitoso!");

          // Extraer la información del token y almacenar el nombre de usuario
          try {
            const tokenInfo = this.parseJwt(respuesta.token);
            const rol = tokenInfo.rol;
            const nombreUsuario = tokenInfo.nombre;

            localStorage.setItem('nombreUsuario', nombreUsuario); // Aquí se almacena el nombre de usuario
            // Establecer el estado de autenticación como autenticado

            // Redirigir a diferentes páginas según el rol del usuario
            switch (rol) {
              case 4:
                this.router.navigate(['/home']);
                break;
              case 3:
                this.router.navigate(['/pagina-empleado-hardware']);
                break;
              case 2:
                this.router.navigate(['/pagina-empleado-software']);
                break;
              case 1:
                this.router.navigate(['/pagina-administrador']);
                break;
              default:
                this.router.navigate(['/pagina-por-defecto']);
                break;
            }

          } catch (error) {
            console.error("Error al decodificar el token:", error);
            alert("Error al decodificar el token");
          }
        } else {
          alert("Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.");
        }
      },
      (error) => {
        console.error("Login", error);
        alert("Error de correo electrónico o contraseña no válida");
      }
    );
  }

  enviarEditarPerfil(formulario_data: any) {
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    // Verificar si el token está presente en el localStorage
    if (!token) {

      console.error("Token no encontrado en el localStorage");
      alert("¡Para editar el perfil primero debes de inciar sesión!");
      this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
      return;
    }
    // Agregar el token al objeto de datos del formulario
    formulario_data.token = token;

    // Enviar los datos del formulario al backend junto con el token
    this.conexHttp.post('/usuario/editarPerfil', formulario_data).subscribe(
      (respuesta: any) => {
        console.log("Editar Perfil", respuesta);
        alert("¡Perfil editado correctamente!");
      },
      (error) => {
        console.error("Editar Perfil", error);
        if (error.status === 401) { // Token expirado o inválido
          alert("¡El token es inválido! Por favor, inicia sesión nuevamente.");
          this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
        } else {
          alert("Error de usuario no encontrado o que los datos no son válidos");
        }
      }
    );
  }

  enviarIncidencia(formulario_data: any) {
    this.conexHttp.post('incidencia/registrar', formulario_data).subscribe(
      (respuesta: any) => {
        if (respuesta.status === 'OK') {
          console.log("Registro", respuesta);
        } else {
          alert("Ocurrió un error al intentar registrar. Por favor, inténtalo de nuevo más tarde.");
        }
      },
      (error) => {
        console.error("Registro", error);
        console.log("Usuario existente con el mismo correo electrónico");
      }
    );
  }

  obtenerUsuarios(): Observable<any> {
    return this.conexHttp.get<any>('incidencias/ver');
  }

  editarIncidencia(formulario_data: any) {
    // Aquí implementa la lógica para editar la incidencia
    this.conexHttp.post('/incidencia/actualizar', formulario_data).subscribe(
      (respuesta: any) => {
        if (respuesta.status === 'OK') {
          console.log("Incidencia editada", respuesta);
          alert("¡Incidencia editada exitosamente!");
        } else {
          alert("Ocurrió un error al intentar editar la incidencia. Por favor, inténtalo de nuevo más tarde.");
        }
      },
      (error) => {
        console.error("Editar incidencia", error);
        alert("Error al editar la incidencia");
      }
    );
  }

  private parseJwt(token: string): any {
    try {
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        throw new Error('Token inválido: no tiene el formato adecuado.');
      }

      const payload = JSON.parse(atob(tokenParts[1]));

      // Agregar mensajes de registro
      console.log('Payload del token:', payload);

      // Validar datos del payload si es necesario
      if (!payload || typeof payload !== 'object') {
        throw new Error('Token inválido: payload no es un objeto.');
      }

      return payload;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      throw new Error('Error al decodificar el token.');
    }
  }
}
