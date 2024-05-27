import { Component } from '@angular/core';
import { PetitionService } from '../petition.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formulario_data: any;
  errorMessage: string = '';
  imgCargar = { cargarsvg: false }; // Definición de la propiedad imgCargar


  constructor(private registroService: PetitionService, private router: Router) { 
    this.formulario_data = {
      nombre: '',
      apellidos: '',
      email: '',
      password: ''
    };
  }

  activarCarga() {
    this.imgCargar.cargarsvg = true; // Activar la carga
  }
  
  enviarRegistro() {
    this.registroService.enviarRegistro(this.formulario_data).subscribe(
      (respuesta: any) => {
        if (respuesta.status === 'OK') {
          console.log("Registro", respuesta);
          console.log("¡Registro exitoso!"); // Puedes cambiar esto si también quieres usar el mensaje en el formulario
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = respuesta.message;
        }
        this.imgCargar.cargarsvg = false; // Desactivar la carga después de recibir la respuesta
      },
      (error) => {
        console.error("Registro", error);
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = "Ocurrió un error al intentar registrar. Por favor, inténtalo de nuevo más tarde.";
        }
        this.imgCargar.cargarsvg = false;
      }
    );
  }
}
