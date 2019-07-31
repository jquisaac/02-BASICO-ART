import { Component } from '@angular/core';
import { WebsocketsService } from 'src/app/services/websockets.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent  {

  constructor( public wsService: WebsocketsService) { }


}
