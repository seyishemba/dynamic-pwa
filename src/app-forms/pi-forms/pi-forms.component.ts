import { FormConfig } from './form-config';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
    selector: 'app-pi-forms',
    templateUrl: './pi-forms.component.html',
    styleUrls: ['./pi-forms.component.less']
})
export class PiFormsComponent implements OnInit {
    form = new FormGroup({});
    model: any = {};
    @Input() fields: FormConfig[];
    @Output() formChange = new EventEmitter();
    formlyFields: FormlyFieldConfig[] = [];
    constructor() {}

    ngOnInit(): void {
        this.fields.forEach((field: FormConfig) => {
            switch (field.type) {
                case 'select':
                    this.formlyFields.push({
                        key: field.key,
                        type: field.type,
                        defaultValue: field.value,
                        templateOptions: {
                          label: field.label,
                          placeholder: field.placeholder,
                          required: field.required,
                          options: field.selectOptions
                        }
                      });
                    break;
                default:
                    this.formlyFields.push({
                        key: field.key,
                        type: field.type,
                        defaultValue: field.value,
                        className: 'd-block mb-5',
                        templateOptions: {
                          label: field.label,
                          placeholder: field.placeholder,
                          required: field.required
                        }
                      });
                    break;
            }
        });
    }

    submitForm() {
        if (this.form.valid) {
            this.formChange.emit(this.model);
        }
    }

}
