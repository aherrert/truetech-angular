import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CargarimagenesServiceService {
equipo:any[]=[]
cargarsvg=true;
  constructor(private http:HttpClient) { 
    this.http.get('https//loginwebstore.firebaseio.com/Equipo.json').subscribe((respuesta:any)=>{
      console.log(respuesta);
      this.cargarsvg=false;
      this.equipo=respuesta;
    });
  }
}
