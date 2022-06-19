import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormConfig } from 'app-forms/pi-forms/form-config';
import { Component, OnInit, Input } from '@angular/core';
import { FormDefinitions } from 'app-forms/pi-forms/form-definitions';
import { InspectionsService } from 'app/services/inspections/inspections.service';


@Component({
    selector: 'app-inspection',
    templateUrl: './inspection.component.html',
    styleUrls: ['./inspection.component.css']
})

export class InspectionComponent implements OnInit {
    @Input() formId: any;
    form: FormGroup = new FormGroup({});
    public fields: FormConfig = {
        id: '',
        title: '',
        definitions: []
    };

    individual: FormDefinitions = {
        key: 'email',
        value: 'mac@dmg.com',
        required: true,
        label: 'Email',
        placeholder: 'Enter email',
        type: 'string'
    };

    lightbox: FormDefinitions = {
        key: 'images',
        value: {
            "id": "01",
            "href": "",
            "thumbnailHref": "",
            "sequence": "0",
            "title": "Happy Image",
            "description": "This is a happy image",
            "tags": [{ "tag": "client", "weight": "99" }, { "tag": "profile", "weight": "99" }],
            "metadata": { "some_attribute": "some value" }
        },
        required: true,
        label: 'Select Images',
        placeholder: 'Select Images',
        type: 'lightbox',
        lightboxData: []
    };
    constructor(private fb: FormBuilder, private Inspections: InspectionsService) {
    }

    ngOnInit(): void {
        this.getFormData()
    }

    getFormData() {
        console.log(this.formId)
        this.Inspections.GetFormForView(["id", this.formId]).subscribe(data => {
            console.log(data)
            var fields: FormConfig = {
                id: data.form.id,
                title: data.form.description,
                definitions: JSON.parse(data.form.formJson)
            };
            this.fields = fields

        }, err => {
        });
    }

    addToFormObject(key, control) {
        this.form.addControl(key, control);
        console.log(this.form.value);
    }
}
