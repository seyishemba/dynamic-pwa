import { Alert } from './../alert/alert';
import { AppService } from '@app/app.service';
import { environment } from 'environments/environment';
import { Component, OnInit, AfterViewChecked, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  env:any = environment;
  @Input() page: any;
  collapse = true;
  showAlert = false;
  message: any;
  buttonText: any;
  constructor(private service: AppService) {
      service.alertSubject.subscribe((alert: Alert) => {
          if (alert.show) {
              this.showAlert = true;
              this.message = alert.message;
              this.buttonText = alert.buttonText;
          }
      });
   }

  ngOnInit(): void {
  }

  collapseMenu() {
      this.collapse = !this.collapse;
  }

  menuCollapsed(event) {
      this.collapse = event;
  }

  alertClosed(event) {
    this.showAlert = event;
}
}
