import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PetitionService {

  imgCargar = { cargarsvg: false }; // Definición de la propiedad imgCargar

  constructor(private router: Router, private conexHttp: HttpClient, private http: HttpClient) { }

  enviarRegistro(formulario_data: any): Observable<any> {
    return this.conexHttp.post('/usuario/registro', formulario_data);
  }

  
  enviarIniciosesion(formulario_data: any): Observable<any> {
    return this.conexHttp.post('/usuario/login', formulario_data);
  }


  editarContrasena(formulario_data: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return new Observable(observer => {
        observer.error("¡Para agregar un usuario primero debes de iniciar sesión como Administrador!");
      });
    }
    formulario_data.token = token;
    return this.conexHttp.post('/usuario/cambiarContrasena', formulario_data);
  }

  obtenerUsuarios(): Observable<any> {
    return this.conexHttp.get<any>('/usuario/tabla_Admin');
  }

  
  enviarRegistro_Admin(formulario_data: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return new Observable(observer => {
        observer.error("¡Para agregar un usuario primero debes de iniciar sesión como Administrador!");
      });
    }
    formulario_data.token = token;
    return this.conexHttp.post('/usuario/registro_admin', formulario_data);
  }


  eliminarUsuarios(formulario_data: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return new Observable(observer => {
        observer.error("¡Para agregar un usuario primero debes de iniciar sesión como Administrador!");
      });
    }
    formulario_data.token = token;
    return this.conexHttp.post('/usuario/borrar', formulario_data);
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

  obtenerIncidencias(): Observable<any> {
    return this.conexHttp.get<any>('incidencias/ver');
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
