import { Component } from '@angular/core';
import { PetitionService } from '../../petition.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-software-worker',
  templateUrl: './software-worker.component.html',
  styleUrls: ['./software-worker.component.css']
})
export class SoftwareWorkerComponent {
  incidencias: any[] = []; // Variable para almacenar las incidencias
  id: number | undefined;
  estado: string = '';
  id2: number | undefined;
  historialIncidencias: any[] = []; // Variable para almacenar el historial de incidencias
  idTicket2: number | undefined;
  imgCargar = { cargarsvg: false }; // Definición de la propiedad imgCargar

  constructor(private editarIncidenciaService: PetitionService, private router: Router, private conexHttp: HttpClient, private http: HttpClient) {

  }
  activarCarga() {
    this.imgCargar.cargarsvg = true; // Activar la carga
  }
  ngOnInit(): void {
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    // Verificar si el token está presente
    if (token) {
      // Llamar al servicio para obtener las incidencias pasando el token
      this.obtenerIncidenciasTrabajador(token);
    } else {
      console.error('No se encontró el token en el localStorage');
    }
  }

  obtenerIncidenciasTrabajador(token: string) {
    // Realizar la solicitud HTTP para obtener las incidencias del cliente
    this.editarIncidenciaService.obtenerIncidenciasTrabajador(token).subscribe(
      (respuesta: any) => {
        console.log("Incidencias", respuesta);
        // Almacenar las incidencias en la variable
        this.incidencias = respuesta["incidencias"];

        // Para cada incidencia, puedes modificar la URL de la imagen para que solo contenga la ruta relativa
        this.incidencias.forEach((incidencia: any) => {
          // Eliminar la parte del dominio de la URL de la imagen y dejar solo la ruta relativa
          const rutaRelativa = incidencia.imagen.substring(incidencia.imagen.indexOf('/images'));
          // Asignar la nueva URL a la propiedad imagen
          incidencia.imagen = 'http://127.0.0.1:8000/' + rutaRelativa;
        });
      },
      (error) => {
        console.error("Error al obtener incidencias", error);
      }
    );
  }
  editarIncidencia() {
    if (this.id !== undefined && this.estado !== '') {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("Token no encontrado en el localStorage");
        alert("¡Para editar la incidencia primero debes iniciar sesión como trabajador!");
        this.router.navigate(['/login']);
        return;
      }
  
      const formulario_data = {
        id: this.id,
        estado: this.estado,
        token: token // Agregar el token al objeto formulario_data
      };
  
      console.log('Datos del formulario:', formulario_data); // Agregamos el console.log para verificar los datos antes de enviarlos al servicio
  
      this.http.post('/incidencia/actualizar', formulario_data).subscribe(
        (respuesta: any) => {
          console.log("Editar Perfil", respuesta);
          if (respuesta.status === 'OK') {
            console.log("Incidencia editada correctamente!");
            window.location.reload();
          } 
          this.imgCargar.cargarsvg = false; // Desactivar la carga después de recibir la respuesta
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
          this.imgCargar.cargarsvg = false; // Desactivar la carga después de recibir la respuesta
        }
      );
    }
  }
  
  obtenerHistorialIncidencias() {
    // Verificar si se proporcionó un ID de ticket
    if (this.id2 !== undefined) {
      // Realizar la solicitud HTTP para obtener el historial de incidencias
      this.editarIncidenciaService.obtenerHistorialIncidencias(this.id2).subscribe(
        (respuesta: any) => {
          console.log("Historial de Incidencias", respuesta);
          // Almacenar el historial de incidencias en la variable
          this.historialIncidencias = respuesta["historial_incidencias"];
          this.imgCargar.cargarsvg = false; // Desactivar la carga después de recibir la respuesta

        },

        (error) => {
          console.error("Error al obtener el historial de incidencias", error);
        }
      );
    } else {
      console.error('ID de Ticket no proporcionado');
    }
    this.imgCargar.cargarsvg = false; // Desactivar la carga después de recibir la respuesta
  }

}