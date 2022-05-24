import { finalize } from 'rxjs/operators';
import { PiFormsService } from './pi-forms.service';
import { FormConfig } from './form-config';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormDefinitions } from './form-definitions';
import { truncate } from 'fs/promises';

@Component({
    selector: 'app-pi-forms',
    templateUrl: './pi-forms.component.html',
    styleUrls: ['./pi-forms.component.less']
})
export class PiFormsComponent implements OnInit {
    form = new FormGroup({});
    /**
     * Model is used to pass form data to ngx formly component
     */
    model: any = {};
    /**
     * When set to true, it uses the URL option to laod and render forms
     */
    @Input() useUrl = true;
    /**
     * Only used when useUrl is false
     */
    @Input() fields: FormConfig;
    /**
     * Inspection id is used for getting form JSON objects for rendering
     */
    @Input() inspectionId: any;
    /**
     * URL for loading JSON form from server
     * This is a GET method
     */
    @Input() getFormObjectUrl: any;
    /**
     * Previously form saved data
     * This object is used to populate the form values
     */
    @Input() data: any = {};
    /**
     * Form changes emits current form data for user consumption
     */
    @Output() formChanges = new EventEmitter();
    /**
     * This is ngx formly object for rendering the form
     */
    formlyFields: FormlyFieldConfig[] = [];
    constructor(private service: PiFormsService) { }

    ngOnInit(): void {
        if (this.useUrl) {
            /**
            * get form JSON object form server
            */
            this.service.getFormObject(this.getFormObjectUrl, this.inspectionId)
                .pipe(finalize(() => { }))
                .subscribe((form: FormConfig) => {
                    this.fields = form;
                    if (this.fields.definitions.length > 0) {
                        this.fields.definitions.forEach((field: FormDefinitions) => {
                            switch (field.type) {
                                case 'enum':
                                    const values = [];
                                    field.enumValues.forEach((u, index) => values.push({ label: u, value: index }));
                                    this.formlyFields.push({
                                        key: field.label,
                                        type: 'select',
                                        className: 'd-block m-4',
                                        defaultValue: field.value,
                                        templateOptions: {
                                            label: field.label,
                                            placeholder: field.placeholder,
                                            required: field.required,
                                            options: values
                                        }
                                    });
                                    break;
                                case 'bool':
                                    this.formlyFields.push({
                                        key: field.label,
                                        type: 'checkbox',
                                        defaultValue: field.value,
                                        className: 'd-block m-4',
                                        templateOptions: {
                                            label: field.label,
                                            placeholder: field.placeholder,
                                            required: field.required
                                        }
                                    });
                                    break;
                                case 'string':
                                    this.formlyFields.push({
                                        key: field.label,
                                        type: 'input',
                                        defaultValue: field.value,
                                        className: 'd-block m-4',
                                        templateOptions: {
                                            label: field.label,
                                            placeholder: field.placeholder,
                                            required: field.required
                                        }
                                    });
                                    break;
                                case 'int':
                                    this.formlyFields.push({
                                        key: field.label,
                                        type: 'input',
                                        defaultValue: field.value,
                                        className: 'd-block m-4',
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
                });
        } else {
            /**
             * get JSON form object as component parameter
             */
            this.fields.definitions.forEach((field: FormDefinitions) => {
                switch (field.type) {
                    case 'enum':
                        const values = [];
                        field.enumValues.forEach((u, index) => values.push({ label: u, value: index }));
                        this.formlyFields.push({
                            key: field.label,
                            type: 'select',
                            className: 'd-block m-4',
                            defaultValue: field.value,
                            templateOptions: {
                                label: field.label,
                                placeholder: field.placeholder,
                                required: field.required,
                                options: values
                            }
                        });
                        break;
                    case 'bool':
                        this.formlyFields.push({
                            key: field.label,
                            type: 'checkbox',
                            defaultValue: field.value,
                            className: 'd-block m-4',
                            templateOptions: {
                                label: field.label,
                                placeholder: field.placeholder,
                                required: field.required
                            }
                        });
                        break;
                    case 'string':
                        this.formlyFields.push({
                            key: field.label,
                            type: 'input',
                            defaultValue: field.value,
                            className: 'd-block m-4',
                            templateOptions: {
                                label: field.label,
                                placeholder: field.placeholder,
                                required: field.required
                            }
                        });
                        break;
                    case 'int':
                        this.formlyFields.push({
                            key: field.label,
                            type: 'input',
                            defaultValue: field.value,
                            className: 'd-block m-4',
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
    }

    submitForm() {
        if (this.form.valid) {
            this.formChanges.emit(this.model);
        }
    }

}
