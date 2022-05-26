import { finalize } from 'rxjs/operators';
import { PiFormsService } from './pi-forms.service';
import { FormConfig } from './form-config';
import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormDefinitions } from './form-definitions';
import { truncate } from 'fs/promises';

@Component({
    selector: 'app-pi-forms',
    templateUrl: './pi-forms.component.html',
    styleUrls: ['./pi-forms.component.less']
})
export class PiFormsComponent implements OnInit {
    /**
    * Add custom css classes
    */
    @Input() inputClass: any;
    /**
     *
     */
    @Input() input: FormDefinitions;
    /**
     *
     */
    @Input() inputValue: any;
    @Output() inputValueChange = new EventEmitter();
    constructor() { }

    ngOnInit(): void {
    }
}
