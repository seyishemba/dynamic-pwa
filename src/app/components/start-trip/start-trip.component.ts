import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '@app/app.service';

@Component({
    selector: 'app-start-trip',
    templateUrl: './start-trip.component.html',
    styleUrls: ['./start-trip.component.css']
})
export class StartTripComponent implements OnInit {
    form: FormGroup;
    @Output() onCloseModal = new EventEmitter();
    tripStatus = '';
    constructor(private fb: FormBuilder,
        private appService: AppService) {
    }

    ngOnInit(): void {
        const currentTime =  this.setNow();
        this.tripStatus = this.appService.getStorageItem(this.appService.tripKey)?.startTripTime;
        this.form = this.fb.group({
            startTripTime: [currentTime, Validators.required],
            endTripTime: [null]
        });
        if (this.tripStatus) {
            this.form.controls['endTripTime'].addValidators(Validators.required);
            this.form.controls['endTripTime'].setValue(currentTime);
            this.form.controls['startTripTime'].setValue(this.tripStatus);
        } else {
            this.form.controls['endTripTime'].clearValidators();
        }

    }

    setNow() {
        let now = new Date();
        let hours = ('0' + now.getHours()).slice(-2);
        let minutes = ('0' + now.getMinutes()).slice(-2);
        let str = hours + ':' + minutes;
        return str;
    }

    closeModal() {
        this.onCloseModal.emit({ save: false, close: true });
    }

    saveClockIn() {
        if (this.tripStatus) {
            this.appService.removeStorageItem(this.appService.tripKey);
            this.appService.alertSubject.next({ show: true, message: 'Trip ended successful', buttonText: 'Close' });
        } else {
            this.appService.setStorageItem(this.appService.tripKey, this.form.getRawValue());
            this.appService.alertSubject.next({ show: true, message: 'Trip started', buttonText: 'Close' });
        }
        this.onCloseModal.emit({ save: true, close: true });
    }
}
