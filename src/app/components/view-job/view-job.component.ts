import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.css']
})
export class ViewJobComponent implements OnInit {
  env:any = environment;

  constructor() { }

  ngOnInit(): void {
  }

}
