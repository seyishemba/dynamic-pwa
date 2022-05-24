import { FormConfig } from './pi-forms/form-config';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-forms',
  templateUrl: './app-forms.component.html',
  styleUrls: ['./app-forms.component.less']
})
export class AppFormsComponent implements OnInit {

    fields: FormConfig = {
        id: '1',
        title: 'Sample form',
        definitions: [
            {
              value: 2,
              required: true,
              label: 'Branch',
              type: 'enum',
              placeholder: 'Select branch',
              enumValues: [
                  'Branch A',
                  'Branch B'
              ]
            },
            {
                type: 'bool',
                value: false,
                required: false,
                label: `Are you not a robot?`
            },
            {
                type: 'string',
                value: 'mac@dmg.com',
                required: true,
                label: 'Email',
                placeholder: 'Enter email',
            },
            {
                type: 'int',
                required: true,
                label: 'Age',
                placeholder: 'Enter Age',
            }
          ]
    };
  constructor() { }

  ngOnInit(): void {
  }

  getFormData(data) {
      alert(JSON.stringify(data));
  }
}
