import { Component, Input } from '@angular/core';
 
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input() content!: string; // Agregamos el modificador de confianza !
  @Input() sender!: string;  // Agregamos el modificador de confianza !
}