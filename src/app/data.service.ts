import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private conexionHttp:HttpClient) {}
  getClientesAjax():Observable<any>{
    let url = "clientes/listar"
    return this.conexionHttp.get(url);
  }
}
