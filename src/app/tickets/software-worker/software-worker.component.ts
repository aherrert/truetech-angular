import { Component } from '@angular/core';
import { PetitionService } from '../../petition.service';


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

  constructor(private editarIncidenciaService: PetitionService) {

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
      const formulario_data = {
        id: this.id,
        estado: this.estado
      };
      console.log('Datos del formulario:', formulario_data); // Agregamos el console.log para verificar los datos antes de enviarlos al servicio
      this.editarIncidenciaService.editarIncidencia(formulario_data);
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
        },
        (error) => {
          console.error("Error al obtener el historial de incidencias", error);
        }
      );
    } else {
      console.error('ID de Ticket no proporcionado');
    }
  }

}