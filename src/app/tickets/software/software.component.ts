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
      mensaje_reparacion: ''
    };

  }

  enviarIncidencia() {
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
}
