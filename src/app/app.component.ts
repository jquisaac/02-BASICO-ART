import { Component, OnInit } from '@angular/core';
import { WebsocketsService } from './services/websockets.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'basico';

  constructor( public websocketService: WebsocketsService) {

  }

  ngOnInit() {

  }


}
