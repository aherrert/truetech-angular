import { Component } from '@angular/core';
import { PetitionService } from '../../petition.service';

@Component({
  selector: 'app-hardware',
  templateUrl: './hardware.component.html',
  styleUrls: ['./hardware.component.css']
})
export class HardwareComponent {
  mostrarFormulario: boolean = false;
  formulario_data: any;
  incidenciaEnviada: boolean = false;
  incidencias: any[] = []; // Variable para almacenar las incidencias

  constructor(private enviarIncidenciaService: PetitionService) {
    this.formulario_data = {
      email: '',
      asunto_reparacion: '',
      mensaje_reparacion: '',
      imagen: null // Agrega la variable para almacenar la imagen seleccionada
    };
  }

  ngOnInit(): void {
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    // Verificar si el token está presente
    if (token) {
      // Llamar al servicio para obtener las incidencias pasando el token
      this.obtenerIncidencias(token);
    } else {
      console.error('No se encontró el token en el localStorage');
    }
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.incidenciaEnviada = false;
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file: File = inputElement.files[0];
      // Asignar el archivo al formulario_data
      this.formulario_data.imagen = file;
    }
  }

  enviarIncidencia2() {
    const incidenciaData = {
      email: this.formulario_data.email,
      asunto_reparacion: this.formulario_data.asunto_reparacion,
      mensaje_reparacion: this.formulario_data.mensaje_reparacion,
      imagen: this.formulario_data.imagen // Asumiendo que la imagen es una URL o un Blob
    };

    this.enviarIncidenciaService.enviarIncidencia2(incidenciaData);
    this.mostrarFormulario = false;
    this.incidenciaEnviada = true;
  }
  obtenerIncidencias(token: string) {
    // Realizar la solicitud HTTP para obtener las incidencias del cliente
    this.enviarIncidenciaService.obtenerIncidenciasCliente(token).subscribe(
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
  
  
  
}
