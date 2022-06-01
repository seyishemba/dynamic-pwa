import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '@app/app.service';
import { environment } from 'environments/environment';


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
    constructor(private appService: AppService) {
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
