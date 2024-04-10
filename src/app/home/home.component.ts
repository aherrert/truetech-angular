import { Component, OnInit } from '@angular/core';
import { DatosService } from '../datos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    datos: any;
    notLogged=false
  
    constructor(private datosService: DatosService) {}
  
    ngOnInit(): void {

      // Implementación del servicio DatosService
      this.datos = this.datosService.obtenerDatosIniciales();
    }
}
