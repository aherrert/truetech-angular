import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enviarcorreo',
  templateUrl: './enviarcorreo.component.html',
  styleUrls: ['./enviarcorreo.component.css']
})
export class EnviarcorreoComponent {
  formulario_data: any;
  imgCargar = { cargarsvg: false }; // Definición de la propiedad imgCargar

  constructor(private http: HttpClient, private router: Router) {
    this.formulario_data = {
      email: '',
      password: ''
    };
  }

  activarCarga() {
    this.imgCargar.cargarsvg = true; // Activar la carga
  }

  enviarcorreo() {
    this.http.post('/usuario/enviarcorreo', this.formulario_data).subscribe(
      (respuesta: any) => {
        if (respuesta.status === 'OK') {
          console.log("enviar correo", respuesta);
          console.log("enviar correo exitoso!");
          this.router.navigate(['/resetpassword']);
        } else {
          alert("Ocurrió un error al intentar enviar correo. Por favor, inténtalo de nuevo más tarde.");
        }
        this.imgCargar.cargarsvg = false; // Desactivar la carga después de recibir la respuesta
      },
      (error) => {
        console.log("enviar correo", error);
        console.log("No se ha podido enviar el correo.");
        this.imgCargar.cargarsvg = false;
      }
    );
  }
}
