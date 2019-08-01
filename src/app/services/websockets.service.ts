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

  // tslint:disable-next-line: ban-types
  /**
   * Emite cualquier evento
   */
  emit( evento: string, payload?: any, callback?: Function ) {

    console.log('Emitiendo', evento);
    console.log('Payload', payload);
    this.socket.emit( evento, payload, callback);
  }

  /**
   * Escucha cualquier evento
   */
  listen( evento: string) {
    return this.socket.fromEvent( evento );
  }

}
