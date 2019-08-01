import { Injectable } from '@angular/core';
import { WebsocketsService } from './websockets.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor( public wsService: WebsocketsService) { }

  sendMessage( mensaje: string ) {
    const payload = {
      de: 'Isaac',
      cuerpo: mensaje
    };

    this.wsService.emit('mensaje', payload);
  }

  getMenssages() {
    return this.wsService.listen('mensaje-nuevo');
  }
}
