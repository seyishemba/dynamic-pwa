import { FormConfig } from './pi-forms/form-config';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-forms',
  templateUrl: './app-forms.component.html',
  styleUrls: ['./app-forms.component.less']
})
export class AppFormsComponent implements OnInit {

    fields: FormConfig[] = [
        {
          key: 'branch',
          type: 'select',
          value: 2,
          required: true,
          label: 'Branch',
          placeholder: 'Select branch',
          selectOptions: [
              {
                  label: 'Branch A',
                  value: 1
              },
              {
                label: 'Branch B',
                value: 2
            }
          ]
        },
        {
            key: 'valid',
            type: 'checkbox',
            value: false,
            required: false,
            label: `Are you not a robot?`
        },
        {
            key: 'email',
            type: 'input',
            value: 'mac@dmg.com',
            required: true,
            label: 'Email',
            placeholder: 'Enter email',
        },
        {
            key: 'address',
            type: 'textarea',
            required: true,
            label: 'Address',
            placeholder: 'Enter Address',
        }
      ];
  constructor() { }

  ngOnInit(): void {
  }

  getFormData(data) {
      alert(JSON.stringify(data));
  }
}
