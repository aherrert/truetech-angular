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
          this.router.navigate(['/home']);
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
        if (respuesta.status === 'OK') {
          console.log("Login", respuesta);
          alert("¡Inicio de sesión exitoso!");
          this.router.navigate(['/home']);
        } else {
          alert("Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.");
        }
      },
      (error) => {
        console.error("Login", error);
        alert("Error de correo electrónico o contraseña no valida");
      }
    );
  }

  enviarEditarPerfil(formulario_data: any) {
    this.conexHttp.post('/usuario/editarPerfil', formulario_data).subscribe(
      (respuesta: any) => {
        console.log("Editar Perfil", respuesta);
      },
      (error) => {
        console.error("Editar Perfil", error);
        alert("Error de usuario no encontrado o que los datos so son válidos");
      }
    )

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


}
