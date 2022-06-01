import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormConfig } from './pi-forms/form-config';
import { Component, OnInit } from '@angular/core';
import { FormDefinitions } from './pi-forms/form-definitions';

@Component({
    selector: 'app-dynamic-forms',
    templateUrl: './app-forms.component.html',
    styleUrls: ['./app-forms.component.less']
})
export class AppFormsComponent implements OnInit {
    form: FormGroup = new FormGroup({});
    public fields: FormConfig = {
        id: '1',
        title: 'Sample form',
        definitions: [
            // {
            //     value: 'Branch A',
            //     required: true,
            //     label: 'Branch',
            //     key: 1,
            //     type: 'enum',
            //     placeholder: 'Select branch',
            //     enumValues: [
            //         'Branch A',
            //         'Branch B'
            //     ]
            // },
            // {
            //     key: 2,
            //     value: false,
            //     required: false,
            //     label: `Are you not a robot?`,
            //     type: 'bool'
            // },
            // {
            //     key: 'email',
            //     value: 'mac@dmg.com',
            //     required: true,
            //     label: 'Email',
            //     placeholder: 'Enter email',
            //     type: 'string'
            // },
            // {
            //     key: 4,
            //     required: true,
            //     label: 'Age',
            //     placeholder: 'Enter Age',
            //     type: 'int'
            // },
            // {
            //     key: 'images',
            //     value: {
            //         "id": "01",
            //         "href": "",
            //         "thumbnailHref" : "",
            //         "sequence" : "0",
            //         "title" : "Happy Image",
            //         "description" : "This is a happy image",
            //         "tags" : [{ "tag" : "client", "weight" : "99"}, { "tag" : "profile", "weight" : "99"}],
            //         "metadata" : { "some_attribute" : "some value" }
            //       },
            //     required: true,
            //     label: 'Select Images',
            //     placeholder: 'Select Images',
            //     type: 'lightbox',
            //     lightboxData: []
            // }
             {
                key: 'email',
                value: 'mac@dmg.com',
                required: true,
                label: 'Email',
                placeholder: 'Enter email',
                type: 'string'
            }

        ]
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
            "thumbnailHref" : "",
            "sequence" : "0",
            "title" : "Happy Image",
            "description" : "This is a happy image",
            "tags" : [{ "tag" : "client", "weight" : "99"}, { "tag" : "profile", "weight" : "99"}],
            "metadata" : { "some_attribute" : "some value" }
          },
        required: true,
        label: 'Select Images',
        placeholder: 'Select Images',
        type: 'lightbox',
        lightboxData: []
    };
    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
    }

    getFormData(data) {
        console.log(data);
        alert(JSON.stringify(data));
    }

    addToFormObject(key, control) {
        this.form.addControl(key, control);
        console.log(this.form.value);
    }
}
