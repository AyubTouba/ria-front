import { Component, Input } from '@angular/core';
import { WebClientService } from 'app/@core/services/api/webclient.service';

@Component({
  selector: 'ngx-data-webclient',
  templateUrl: './data-webclient.component.html',
})
export class DataWebClientComponent {

  @Input() webclient:any
}
