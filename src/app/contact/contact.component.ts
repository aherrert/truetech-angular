import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  formData: { name: string, email: string, message: string } = { name: '', email: '', message: '' };

  submitForm() {
    // Aquí podrías agregar la lógica para enviar el formulario
    console.log('Formulario enviado:', this.formData);
  }
}
