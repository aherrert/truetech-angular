import { Component } from '@angular/core';
import { PetitionService } from '../petition.service';


class Usuario {
  id: number = 0;
  nombre: string = "";
  apellidos: string = "";
  email: string = "";
  password: string = "";
  id_cargo: number = 0;
}
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  usuarios: Usuario[] = []; // Define una propiedad para almacenar los usuarios
  formulario_data: any;
  id: number | undefined;



  constructor(private enviarUsuarioAdmin: PetitionService) {
    this.formulario_data = {
      nombre: '',
      apellidos: '',
      email: '',
      password: '',
      cargo: '' // Agrega la variable para almacenar la imagen seleccionada
    };
    this.id = undefined; // Initialize id property
  }
  agregarUsuario() {
    this.enviarUsuarioAdmin.enviarRegistro_Admin(this.formulario_data);

  }
  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.enviarUsuarioAdmin.obtenerUsuarios().subscribe(
      (respuesta: any) => {
        console.log("Usuarios", respuesta);
        this.usuarios = respuesta["usuarios"];
      },
      (error) => {
        console.error("Error al obtener usuarios", error);
      }
    );
  }
  eliminarUsuarios() {
    console.log("ID to delete:", this.id); // Check if ID is set correctly
    if (this.id !== undefined) {
      const formulario_data = {
        id: this.id,
      };
      console.log("Form data:", formulario_data); // Check form data
      this.enviarUsuarioAdmin.eliminarUsuarios(formulario_data);
    }
  }


}
