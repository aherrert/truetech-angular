import { Component } from '@angular/core';
 
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  messages: any[] = [];
  nombre: string = '';
  nombreIngresado: boolean = false;
  mostrarBotonesPreguntas: boolean = false;
  showChatbot: boolean = true; // Propiedad para controlar la visibilidad del chatbot
 
  preguntasFrecuentes = [
    {
      pregunta: "¿Cuál es tu horario de atención?",
      respuesta: "Nuestro horario de atención es de lunes a viernes de 9:00 a 18:00.",
      seleccionada: false
    },
    {
      pregunta: "¿Cómo puedo contactaros?",
      respuesta: "Puedes contactarnos a través de nuestro correo electrónico support@truetech.com o por teléfono al +123456789.",
      seleccionada: false
    }
  ];
 
  ingresarNombre() {
    if (this.nombre.trim() !== '') {
      this.nombreIngresado = true;
      this.messages.push({
        content: `¡Hola ${this.nombre}! Soy el chatbot de resolución de tickets de TrueTech. ¿En qué puedo ayudarte?`,
        sender: 'bot'
      });
    }
  }
 
  mostrarPreguntasFrecuentes() {
    this.preguntasFrecuentes.forEach(pregunta => {
      pregunta.seleccionada = false;
    });
    this.mostrarBotonesPreguntas = true;
  }
 
  toggleRespuesta(pregunta: any) {
    pregunta.seleccionada = !pregunta.seleccionada;
  }
}
