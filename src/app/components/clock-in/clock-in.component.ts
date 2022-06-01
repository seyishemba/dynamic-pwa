import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppService } from '@app/app.service';

@Component({
    selector: 'app-clock-in',
    templateUrl: './clock-in.component.html',
    styleUrls: ['./clock-in.component.css']
})
export class ClockInComponent implements OnInit {
    form: FormGroup;
    clockInStatus = '';
    @Output() onCloseModal = new EventEmitter();
    constructor(private fb: FormBuilder,
        private appService: AppService) { }

    ngOnInit(): void {
        const currentTime =  this.setNow();
        this.clockInStatus = this.appService.getStorageItem(this.appService.key)?.clockIn;
        this.form = this.fb.group({
            clockIn: [currentTime, Validators.required],
            clockOut: [null]
        });
        if (this.clockInStatus) {
            this.form.controls['clockOut'].addValidators(Validators.required);
            this.form.controls['clockOut'].setValue(currentTime);
            this.form.controls['clockIn'].setValue(this.clockInStatus);
        } else {
            this.form.controls['clockOut'].clearValidators();
        }
    }

    setNow() {
        let now = new Date();
        let hours = ("0" + now.getHours()).slice(-2);
        let minutes = ("0" + now.getMinutes()).slice(-2);
        let str = hours + ':' + minutes;
        return str;
    }

    closeModal() {
        this.onCloseModal.emit({ save: false, close: true });
    }

    saveClockIn() {
        if (this.clockInStatus) {
            this.appService.removeStorageItem(this.appService.key);
            this.appService.alertSubject.next({ show: true, message: 'Clock out successful', buttonText: 'Close' });
        } else {
            this.appService.alertSubject.next({ show: true, message: 'Clock in successful', buttonText: 'Close' });
            this.appService.setStorageItem(this.appService.key, this.form.getRawValue());
        }
        this.onCloseModal.emit({ save: true, close: true });
    }
}
