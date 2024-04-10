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
  }
}
