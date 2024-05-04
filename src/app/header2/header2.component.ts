import { Component } from '@angular/core';
import { DatosService } from '../datos.service';


@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component {
  datos: any;


  constructor(private datosService: DatosService) {}

  ngOnInit(): void {
    // Implementación del servicio DatosService
    this.datos = this.datosService.obtenerDatosIniciales();
    const nombreUsuarioElement = document.getElementById('nombre-usuario');
    if (nombreUsuarioElement !== null) {
      // Obtener el nombre de usuario desde localStorage
      const nombreUsuario = localStorage.getItem('nombreUsuario');
      if (nombreUsuario) {
        nombreUsuarioElement.innerText = nombreUsuario;
      } else {
        console.error("Nombre de usuario no encontrado en el almacenamiento local.");
      }
    } else {
      console.error("Elemento con id 'nombre-usuario' no encontrado en el DOM.");
    }
  
  }
}
