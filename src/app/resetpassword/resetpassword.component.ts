import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {
  formulario_data: any;
  imgCargar = { cargarsvg: false }; // Definición de la propiedad imgCargar

  constructor(private http: HttpClient, private router: Router) { 
    this.formulario_data = {
      email: '',
      password: '',
      id: ''
    };
  }

  activarCarga() {
    this.imgCargar.cargarsvg = true; // Activar la carga
  }


  enviarResetpassword() {
    this.http.post('/usuario/resetpassword', this.formulario_data).subscribe(
      (respuesta: any) => {
        if (respuesta.status === 'OK') {
          console.log("resetpassword", respuesta);
          console.log("resetpassword exitoso!");
          this.router.navigate(['/login']);
        } else {
          alert("Ocurrió un error al intentar resetpassword. Por favor, inténtalo de nuevo más tarde.");
        }
        this.imgCargar.cargarsvg = false; // Desactivar la carga después de recibir la respuesta
      },
      (error) => {
        console.log("resetpassword", error);
        alert("Ocurrió un error al intentar resetpassword. Por favor, inténtalo de nuevo más tarde.");
        this.imgCargar.cargarsvg = false; // Desactivar la carga después de recibir la respuesta
      }
    );
  }
}
