import { Component, OnInit } from '@angular/core';
import{RestfullService} from '../service/restfull.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  constructor(public restfullService:RestfullService ) { }

  ngOnInit() {
  }


}
