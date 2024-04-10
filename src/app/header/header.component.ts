import { Component, OnInit } from '@angular/core';
import { DatosService } from '../datos.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  datos: any;


  constructor(private datosService: DatosService) {}

  ngOnInit(): void {
    // Implementación del servicio DatosService
    this.datos = this.datosService.obtenerDatosIniciales();
  }
}




