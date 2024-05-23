import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  enviarRegistro_Admin(formulario_data: any) {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("Token no encontrado en el localStorage");
      alert("¡Para agregar un usuario primero debes de iniciar sesión como Administrador!");
      this.router.navigate(['/login']);
      return;
    }
    formulario_data.token = token;
    this.conexHttp.post('/usuario/registro_admin', formulario_data).subscribe(
      (respuesta: any) => {
        if (respuesta.status === 'OK') {
          console.log("Registro", respuesta);
          alert("¡Registro exitoso por el Administrador!");
          this.router.navigate(['/admin']);
        }
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
        alert(errorMessage);
      }
    );
  }

  eliminarUsuarios(formulario_data: any) {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("Token no encontrado en el localStorage");
      alert("¡Para eliminar un usuario primero debes de iniciar sesión como Administrador!");
      this.router.navigate(['/login']);
      return;
    }
    formulario_data.token = token;
    this.conexHttp.post('/usuario/borrar', formulario_data).subscribe(
      (respuesta: any) => {
        if (respuesta.status === 'OK') {
          console.log("Registro", respuesta);
          alert("¡Usuario eliminado por el Administrador!");
          this.router.navigate(['/admin']);
        }
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
        alert(errorMessage);
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

  obtenerUsuarios(): Observable<any> {
    return this.conexHttp.get<any>('/usuario/tabla_Admin');
  }

  obtenerIncidenciasCliente(token: string): Observable<any> {
    // Construir los encabezados de la solicitud con el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Realizar la solicitud HTTP con los encabezados
    return this.http.get<any>('/incidencia/ver-cliente', { headers });
  }

  obtenerIncidenciasTrabajador(token: string): Observable<any> {
    // Construir los encabezados de la solicitud con el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Realizar la solicitud HTTP con los encabezados
    return this.http.get<any>('/incidencia/ver-trabajador', { headers });
  }

  obtenerIncidenciasTrabajador2(token: string): Observable<any> {
    // Construir los encabezados de la solicitud con el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Realizar la solicitud HTTP con los encabezados
    return this.http.get<any>('/incidencia/ver-trabajador2', { headers });
  }


  enviarIncidencia(incidenciaData: any) {
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    // Verificar si el token está presente en el localStorage
    if (!token) {
      console.error("Token no encontrado en el localStorage");
      alert("¡Para enviar una incidencia debes iniciar sesión!");
      this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
      return;
    }

    // Agregar el token y el id_cargo al objeto de datos de la incidencia
    incidenciaData.token = token;
    incidenciaData.id_cargo = '2'; // Establecer el id_cargo en 2

    // Log de los datos que se están enviando
    console.log("Datos a enviar:", incidenciaData);

    // Crear un FormData para enviar datos y archivos
    const formData = new FormData();
    formData.append('email', incidenciaData.email);
    formData.append('asunto_reparacion', incidenciaData.asunto_reparacion);
    formData.append('mensaje_reparacion', incidenciaData.mensaje_reparacion);
    formData.append('imagen', incidenciaData.imagen); // Agregar la imagen al FormData
    formData.append('token', token); // Agregar el token al FormData
    formData.append('id_cargo', '2'); // Agregar el id_cargo al FormData

    // Realizar la solicitud HTTP con los datos de la incidencia
    this.conexHttp.post('incidencia/registrar', formData).subscribe(
      (respuesta: any) => {
        if (respuesta.status === 'OK') {
          console.log("Incidencia", respuesta);
          alert("¡Incidencia creada exitosamente!");

        } else {
          alert("Ocurrió un error al intentar registrar. Por favor, inténtalo de nuevo más tarde.");
        }
      },
      (error) => {
        console.error("Registro", error);
        let errorMessage = "Error al enviar la incidencia";

        if (error.status === 401) {
          errorMessage = "Acceso no autorizado. Por favor, inicia sesión.";
        } else if (error.status === 403) {
          errorMessage = "El token ha expirado o es inválido.";
          this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
        } else {
          errorMessage = "Ocurrió un error en el servidor. Por favor, inténtalo de nuevo más tarde.";
        }

        alert(errorMessage);
      }
    );
  }

  enviarIncidencia2(incidenciaData: any) {
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    // Verificar si el token está presente en el localStorage
    if (!token) {
      console.error("Token no encontrado en el localStorage");
      alert("¡Para enviar una incidencia debes iniciar sesión!");
      this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
      return;
    }

    // Agregar el token y el id_cargo al objeto de datos de la incidencia
    incidenciaData.token = token;
    incidenciaData.id_cargo = '3'; // Establecer el id_cargo en 2

    // Log de los datos que se están enviando
    console.log("Datos a enviar:", incidenciaData);

    // Crear un FormData para enviar datos y archivos
    const formData = new FormData();
    formData.append('email', incidenciaData.email);
    formData.append('asunto_reparacion', incidenciaData.asunto_reparacion);
    formData.append('mensaje_reparacion', incidenciaData.mensaje_reparacion);
    formData.append('imagen', incidenciaData.imagen); // Agregar la imagen al FormData
    formData.append('token', token); // Agregar el token al FormData
    formData.append('id_cargo', '3'); // Agregar el id_cargo al FormData

    // Realizar la solicitud HTTP con los datos de la incidencia
    this.conexHttp.post('incidencia/registrar', formData).subscribe(
      (respuesta: any) => {
        if (respuesta.status === 'OK') {
          console.log("Incidencia", respuesta);
          alert("¡Incidencia creada exitosamente!");

        } else {
          alert("Ocurrió un error al intentar registrar. Por favor, inténtalo de nuevo más tarde.");
        }
      },
      (error) => {
        console.error("Registro", error);
        let errorMessage = "Error al enviar la incidencia";

        if (error.status === 401) {
          errorMessage = "Acceso no autorizado. Por favor, inicia sesión.";
        } else if (error.status === 403) {
          errorMessage = "El token ha expirado o es inválido.";
          this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
        } else {
          errorMessage = "Ocurrió un error en el servidor. Por favor, inténtalo de nuevo más tarde.";
        }

        alert(errorMessage);
      }
    );
  }
  obtenerIncidencias(): Observable<any> {
    return this.conexHttp.get<any>('incidencias/ver');
  }

  editarIncidencia(formulario_data: any) {
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    // Verificar si el token está presente en el localStorage
    if (!token) {
      console.error("Token no encontrado en el localStorage");
      alert("¡Para editar la incidencia primero debes iniciar sesión como trabajador!");
      this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
      return;
    }

    // Agregar el token al objeto de datos del formulario
    formulario_data.token = token;

    // Aquí implementa la lógica para editar la incidencia
    // Enviar los datos del formulario al backend junto con el token
    this.conexHttp.post('/incidencia/actualizar', formulario_data).subscribe(
      (respuesta: any) => {
        console.log("Editar Perfil", respuesta);
        if (respuesta.status === 'OK') {
          alert("Incidencia editada correctamente!");
        } else {
          alert("Error desconocido");
        }
      },
      (error) => {
        console.error("Editar Perfil", error);
        if (error.status === 400) {
          alert("No se proporcionó el ID del ticket y el nuevo estado");
        } else if (error.status === 401) {
          alert("Token inválido, por favor inicia sesión nuevamente");
          this.router.navigate(['/login']);
        } else if (error.status === 403) {
          alert("No tienes permiso para acceder a esta funcionalidad");
        } else if (error.status === 404) {
          alert("No se encontró la incidencia asociada al ID proporcionado");
        } else {
          alert("Error desconocido");
        }
      }
    );
  }

  editarIncidencia2(formulario_data: any) {
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    // Verificar si el token está presente en el localStorage
    if (!token) {
      console.error("Token no encontrado en el localStorage");
      alert("¡Para editar la incidencia primero debes iniciar sesión como trabajador!");
      this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
      return;
    }

    // Agregar el token al objeto de datos del formulario
    formulario_data.token = token;

    // Aquí implementa la lógica para editar la incidencia
    // Enviar los datos del formulario al backend junto con el token
    this.conexHttp.post('/incidencia/actualizar2', formulario_data).subscribe(
      (respuesta: any) => {
        console.log("Editar Perfil", respuesta);
        if (respuesta.status === 'OK') {
          alert("Incidencia editada correctamente!");
        } else {
          alert("Error desconocido");
        }
      },
      (error) => {
        console.error("Editar Perfil", error);
        if (error.status === 400) {
          alert("No se proporcionó el ID del ticket y el nuevo estado");
        } else if (error.status === 401) {
          alert("Token inválido, por favor inicia sesión nuevamente");
          this.router.navigate(['/login']);
        } else if (error.status === 403) {
          alert("No tienes permiso para acceder a esta funcionalidad");
        } else if (error.status === 404) {
          alert("No se encontró la incidencia asociada al ID proporcionado");
        } else {
          alert("Error desconocido");
        }
      }
    );
  }

  obtenerHistorialIncidencias(idTicket: number): Observable<any> {
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    // Verificar si el token está presente en el localStorage
    if (!token) {
      console.error("Token no encontrado en el localStorage");
      alert("¡Para obtener el historial de incidencias debes iniciar sesión!");

    }

    // Construir los datos a enviar en la solicitud
    const data = { id: idTicket, token: token };

    // Realizar la solicitud HTTP para obtener el historial de incidencias
    return this.http.post<any>('/incidencias/historico', data);
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
  enviarResetpassword(formulario_data: any) {
    this.conexHttp.post('/usuario/resetpassword', formulario_data).subscribe(
      (respuesta: any) => {
        if (respuesta.status === 'OK') {
          console.log("resetpassword", respuesta);
          alert("resetpassword exitoso!");
          this.router.navigate(['/resetpassword']);
        } else {
          alert("Ocurrió un error al intentar resetpassword. Por favor, inténtalo de nuevo más tarde.");
        }
      },
      (error) => {
        console.error("resetpassword", error);
        alert("Usuario existente con el mismo correo electrónico");
      }
    );
  }

  enviarcorreo(formulario_data: any) {
    this.conexHttp.post('/usuario/enviarcorreo', formulario_data).subscribe(
      (respuesta: any) => {
        if (respuesta.status === 'OK') {
          console.log("enviar correo", respuesta);
          alert("enviar correo exitoso!");
          this.router.navigate(['/enviarcorreo']);
        } else {
          alert("Ocurrió un error al intentar enviar correo. Por favor, inténtalo de nuevo más tarde.");
        }
      },
      (error) => {
        console.error("enviar correo", error);
        alert("No se ha podido enviar el correo.");
      }
    );
  }
}
