import { Component } from '@angular/core';
import { PetitionService } from '../petition.service';

@Component({
  selector: 'app-enviarcorreo',
  templateUrl: './enviarcorreo.component.html',
  styleUrls: ['./enviarcorreo.component.css']
})
export class EnviarcorreoComponent {
  formulario_data: any;

  constructor(private enviarcorreoService: PetitionService) { 
    this.formulario_data = {
      email: '',
      password: ''
    };
  }

  enviarcorreo() {
    this.enviarcorreoService.enviarcorreo(this.formulario_data);
  }
}

