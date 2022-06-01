import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '@app/app.service';

@Component({
  selector: 'app-upload-media',
  templateUrl: './upload-media.component.html',
  styleUrls: ['./upload-media.component.css']
})
export class UploadMediaComponent implements OnInit {
    form: FormGroup;
    @Output() onCloseModal = new EventEmitter();
    constructor(private fb: FormBuilder,
        private appService: AppService) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            tags: ['', Validators.required],
            includeInGallery: ['', Validators.required],
            image: ['', Validators.required]
        });
    }

    closeModal() {
        this.onCloseModal.emit({ save: false, close: true });
    }
}
