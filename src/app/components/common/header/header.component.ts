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
  constructor() { }

  ngOnInit(): void {
  }

}
