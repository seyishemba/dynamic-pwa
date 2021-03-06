import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
    @Input() message: any;
    @Input() buttonText: any;

    @Output() onCloseAlert = new EventEmitter();
    constructor() { }

    ngOnInit(): void {
    }

    closeAlert() {
        this.onCloseAlert.emit(false);
    }
}
