import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '@app/app.service';

@Component({
    selector: 'app-refuel',
    templateUrl: './refuel.component.html',
    styleUrls: ['./refuel.component.css']
})
export class RefuelComponent implements OnInit {
    form: FormGroup;
    @Output() onCloseModal = new EventEmitter();
    constructor(private fb: FormBuilder,
        private appService: AppService) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            fillingStation: ['', Validators.required],
            odometer: ['', Validators.required],
            grade: ['', Validators.required],
            gallons: ['', Validators.required],
            totalPaid: ['', Validators.required],
            paidWith: ['', Validators.required]
        });
    }

    closeModal() {
        this.onCloseModal.emit({ save: false, close: true });
    }
}
