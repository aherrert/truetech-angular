import { Component } from '@angular/core';
import { PetitionService } from '../petition.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {
  formulario_data: any;

  constructor(private resetpasswordService: PetitionService) { 
    this.formulario_data = {
      email: '',
      password: '',
      id: ''
    };
  }

  enviarResetpassword() {
    this.resetpasswordService.enviarResetpassword(this.formulario_data);
  }
}
