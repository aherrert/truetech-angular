import { Component } from '@angular/core';
import { PetitionService } from '../../petition.service';

class Empleado {
  id: number = 0;
  nombre_completo: string = "";
  email: string = "";
  asunto_reparacion: string = "";
  mensaje_reparacion: string = "";
  estado: string = "";
}

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.css']
})
export class SoftwareComponent {
  mostrarFormulario: boolean = false;
  formulario_data: any;
  incidenciaEnviada: boolean = false;
  usuarios: Empleado[] = [];

  id: number | undefined;
  nuevoEstado: string = '';

  constructor(private enviarIncidenciaService: PetitionService) {
    this.formulario_data = {
      nombre_completo: '',
      email: '',
      asunto_reparacion: '',
      mensaje_reparacion: '',
      imagen: null // Agrega la variable para almacenar la imagen seleccionada
    };
  }

  enviarIncidencia() {
    if (!this.formulario_data.imagen) {
      console.error("Por favor, seleccione una imagen.");
      return; // No enviamos el formulario si no hay imagen seleccionada
    }
  
    this.enviarIncidenciaService.enviarIncidencia(this.formulario_data);
    this.mostrarFormulario = false;
    this.incidenciaEnviada = true;
  }
  

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.incidenciaEnviada = false;
  }

  obtenerUsuarios() {
    this.enviarIncidenciaService.obtenerUsuarios().subscribe(
      (respuesta: any) => {
        console.log("Usuarios", respuesta);
        this.usuarios = respuesta["incidencias"];
      },
      (error) => {
        console.error("Error al obtener usuarios", error);
      }
    );
  }

  editarIncidencia() {
    if (this.id !== undefined) {
      const formulario_data = {
        id: this.id,
        nuevoEstado: this.nuevoEstado
      };
      this.enviarIncidenciaService.editarIncidencia(formulario_data);
    }
  }

  // Método para manejar la selección de archivo
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file: File = inputElement.files[0];
      // Verificar si el tipo de archivo es permitido
      if (this.isValidFileType(file)) {
        // Aquí puedes procesar el archivo, como guardarlo en tu variable formulario_data.imagen
        this.formulario_data.imagen = file;
      } else {
        // Mostrar un mensaje de error o tomar otra acción adecuada
        console.error("Tipo de archivo no permitido. Selecciona una imagen JPEG, JPG o PNG.");
      }
    }
  }
  
  // Método para verificar si el tipo de archivo es válido
  isValidFileType(file: File): boolean {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    return allowedTypes.includes(file.type);
  }
  
  
  
}
