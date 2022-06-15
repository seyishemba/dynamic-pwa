import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '@app/app.service';
import { environment } from 'environments/environment';
import { InspectionsService } from 'app/services/inspections/inspections.service';
import { Api } from 'app/api';

@Component({
    selector: 'app-view-job',
    templateUrl: './view-job.component.html',
    styleUrls: ['./view-job.component.css']
})
export class ViewJobComponent implements OnInit, OnDestroy {
    env: any = environment;
    showModalClockIn = false;
    showModalTrip = false;
    showModalFuel = false;
    tripStatus = '';
    clockInStatus = '';
    job:any;
    jobFormId:any;
    constructor(private Api: Api, private appService: AppService,  private Inspections: InspectionsService) {
        this.GetInspectionForView()
        appService.clockSubject.subscribe((value) => {
            if (value) {
                this.clockModal();
            }
        });

        appService.tripSubject.subscribe((value) => {
            if (value) {
                this.tripModal();
            }
        });

        appService.fuelSubject.subscribe((value) => {
            if (value) {
                this.fuelModal();
            }
        });
     }
    ngOnDestroy(): void {
        this.appService.removeStorageItem(this.appService.jobKey);
    }

    ngOnInit(): void {
        this.clockInStatus = this.appService.getStorageItem(this.appService.key)?.clockIn;
        this.tripStatus = this.appService.getStorageItem(this.appService.tripKey)?.startTripTime;
    }
    
    GetInspectionForView(){
        const InspectionId = this.Api.getRoute(3);

        this.Inspections.GetInspectionForView(["id", InspectionId]).subscribe(data => {
            console.log(data)
            this.job = data;
          }, err => {
        });
    }

    ngOnChanges() {
        this.jobFormId = this.job?.inspection.formId
        console.log(this.jobFormId)
    }

    clockModal(event?: any) {
        if (event?.save) {
            this.clockInStatus = this.appService.getStorageItem(this.appService.key)?.clockIn;
        }
        this.showModalClockIn = !this.showModalClockIn;
    }

    tripModal(event?: any) {
        if (event?.save) {
            this.tripStatus = this.appService.getStorageItem(this.appService.tripKey)?.startTripTime;
        }
        this.showModalTrip = !this.showModalTrip;
    }

    fuelModal() {
        this.showModalFuel = !this.showModalFuel;
    }
}
