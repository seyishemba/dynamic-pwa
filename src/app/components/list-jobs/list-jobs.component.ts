import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '@app/app.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-list-jobs',
  templateUrl: './list-jobs.component.html',
  styleUrls: ['./list-jobs.component.css']
})
export class ListJobsComponent implements OnInit {
  env:any = environment;
  amount:any = [1,2,3,4,5,6,7,8,9,10];
  constructor(private router: Router,
    private appService: AppService) { }

  ngOnInit(): void {
  }

  viewJob(id) {
    this.appService.setStorageItem(this.appService.jobKey, id);
      this.router.navigate(['/component-dashboard/view-job']);
  }
}
