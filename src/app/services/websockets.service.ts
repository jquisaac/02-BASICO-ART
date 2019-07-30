import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {

  public socketStatus = false;

  constructor( private socket: Socket) {
    this.checkStatus();
   }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado a servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado a servidor');
      this.socketStatus = false;
    });
  }
}
