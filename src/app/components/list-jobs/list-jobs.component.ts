import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '@app/app.service';
import { environment } from 'environments/environment';
import { InspectionsService } from 'app/services/inspections/inspections.service';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-list-jobs',
  templateUrl: './list-jobs.component.html',
  styleUrls: ['./list-jobs.component.css']
})
export class ListJobsComponent implements OnInit {
  env:any = environment;
  jobs:any;

  constructor(private router: Router,
    private appService: AppService, private Inspections: InspectionsService) { }

  ngOnInit(): void {
    this.listJobs()
  }

  listJobs(){
      this.Inspections.GetAll(["", '']).subscribe(data => {
            this.jobs = data;
          }, err => {
            console.log(err, 'err')
          });
  }

}
