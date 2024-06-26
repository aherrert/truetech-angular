import { Component, OnInit } from '@angular/core';
import { DatosService } from '../datos.service';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showChatbot: boolean = false;
  datos: any;
  notLogged = false;

  constructor(private datosService: DatosService) {}

  ngOnInit(): void {
    // Implementación del servicio DatosService
    this.datos = this.datosService.obtenerDatosIniciales();
   
    // Comprueba si el usuario está autenticado
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    if (!nombreUsuario) {
      this.notLogged = true;
    }
  }

  toggleChatbotVisibility() {
    this.showChatbot = !this.showChatbot;
    const botonCentrado = document.getElementById('botonCentrado');
    if (botonCentrado) {
      if (this.showChatbot) {
        botonCentrado.classList.add('opened');
      } else {
        botonCentrado.classList.remove('opened');
      }
    }
  }

  logout() {
    // Borra los tokens del localStorage
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('token');
    window.location.reload();
    // Actualiza el estado de autenticación
    this.notLogged = true;
  }
}
