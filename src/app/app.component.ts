import { Component, OnInit } from '@angular/core';
import { DatosService } from './datos.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  showHeader1: boolean = true;
  showHeader2: boolean = false; // Agrega una nueva variable para controlar la visibilidad del app-header2
  datos: any;

  constructor(private datosService: DatosService, private router: Router) {}

  ngOnInit(): void {
    // Implementación del servicio DatosService
    this.datos = this.datosService.obtenerDatosIniciales();

    // Controlar la visibilidad del header basado en las rutas
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.url;
        this.showHeader1 = !url.includes('/login') && !url.includes('/register') && !url.includes('/software') && !url.includes('/hardware')&& !url.includes('/profile')&& !url.includes('/contact'); // Mostrar el header en todas las rutas excepto '/about' y '/login'
        this.showHeader2 = url.includes('/login') || url.includes('/register') || url.includes('/software') || url.includes('/hardware')|| url.includes('/profile')|| url.includes('/contact'); // Mostrar el header2 solo en '/login', '/register, /tickets y /profile'
      }
    });
  }
}
