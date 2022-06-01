import { AppService } from '@app/app.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    public menu: Array<any> = [];
    constructor(private service: AppService) {
        const job = this.service.getStorageItem(this.service.jobKey);
        this.menu = [
            {
                title: 'Home',
                isRoute: true,
                path: '/component-dashboard'
            },
            {
                title: 'Clock In/Clock Out',
                isRoute: false,
                modal: () => {
                    if (job) {
                        service.clockSubject.next(true);
                    } else {
                        alert('Please select a job');
                    }
                    service.collapseMenuSubject.next(true);
                }
            },
            {
                title: 'Start Trip/End Trip',
                isRoute: false,
                modal: () => {
                    if (job) {
                        service.tripSubject.next(true);
                    } else {
                        alert('Please select a job');
                    }
                    service.collapseMenuSubject.next(true);
                }
            },
            {
                title: 'Refuel Vehicle',
                isRoute: false,
                modal: () => {
                    if (job) {
                        service.fuelSubject.next(true);
                    } else {
                        alert('Please select a job');
                    }
                    service.collapseMenuSubject.next(true);
                }
            }
        ];
    }

}
