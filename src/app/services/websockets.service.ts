import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';
import { promise } from 'protractor';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {

  public socketStatus = false;
  public usuario: Usuario;

  constructor( 
    private socket: Socket,
    private router: Router
    ) {
    this.checkStatus();
    this.cargarStorage();
   }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado a servidor');
      this.socketStatus = true;
      this.cargarStorage();
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
   * Regresa un observable al que te puedes suscribir
   */
  listen( evento: string) {
    return this.socket.fromEvent( evento );
  }

  /**
   * Configuracion de usuario conectado
   */
  loginWS( nombre: string) {

    return new Promise ( (resolve, reject) => {
      console.log('Configurando' , nombre);
      this.emit( 'configurar-usuario' , { nombre }, resp  => {

        this.usuario = new Usuario( nombre );
        this.guardarStorage();

        resolve();

      });
    });
  }

  logoutWS() {
    this.usuario = null;
    localStorage.removeItem('usuario');
    const payload = {
      nombre: 'sin-nombre'
    };
    this.emit('configurar-usuario', payload, () => {} );

    this.router.navigateByUrl('/');
  }

  getUsuario() {
    return this.usuario;
  }

  /**
   * Almacena el usuario en memoria
   */
  guardarStorage() {
    localStorage.setItem( 'usuario', JSON.stringify( this.usuario) );
  }

  /**
   * Verifico si ya existen usuarios en memoria para cargarlo
   */
  cargarStorage() {
    if ( localStorage.getItem('usuario') ) {
      this.usuario = JSON.parse( localStorage.getItem('usuario'));
      this.loginWS ( this.usuario.nombre );
    }

  }

}
