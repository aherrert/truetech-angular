// datos.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatosService {
  obtenerDatosIniciales() {
    return {
      images: [
         { image: "informatica.webp"},
        { image: "logo_normal.png"},
        { image: "logo_blanco.png"},
        
       
      ],
      aboutUsText: "Our team consists of three dedicated members: Wesley, Arnau, and Alejandro, who collectively bring their expertise and passion to drive the success of our computer company. Together, we strive to provide top-notch services, cater to the needs of our customers, and continue to grow and adapt to the ever-changing technology landscape.",
      camposFormularioContacto: [
        { type: 'text', placeholder: 'Nombre', name: 'nombre' },
        { type: 'text', placeholder: 'Apellidos', name: 'apellidos' },
        { type: 'email', placeholder: 'Email', name: 'email' },
        { type: 'number', placeholder: 'Teléfono', name: 'phone' },
        { type: 'text', placeholder: 'Mensaje', name: 'message' },
      ],
    };
  }
}
