
import { Component, OnInit } from '@angular/core';
import { LightboxData } from 'app-forms/lightbox/lightbox-data';

@Component({
    selector: 'app-photos',
    templateUrl: './photos.component.html',
    styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
    showUploadMedia = false;
    lightBoxList: Array<LightboxData> = [];
    lightBoxList2: Array<LightboxData> = [];
    lightBoxList3: Array<LightboxData> = [];
    lightBoxList4: Array<LightboxData> = [];
    constructor() { }
    lightboxData: any = {
        'id': '01',
        'href': '',
        'thumbnailHref': '',
        'sequence': '0',
        'title': 'Image Category 1',
        'description': 'Category 1',
        'tags': [{ 'tag': 'client', 'weight': '99' }, { 'tag': 'profile', 'weight': '99' }],
        'metadata': { 'some_attribute': 'some value' },
        'edit': false
    };
    lightboxData2: any = {
        'id': '02',
        'href': '',
        'thumbnailHref': '',
        'sequence': '0',
        'title': 'Image Category 2',
        'description': 'Category 2',
        'tags': [{ 'tag': 'client', 'weight': '99' }, { 'tag': 'profile', 'weight': '99' }],
        'metadata': { 'some_attribute': 'some value' },
        'edit': false
    };
    lightboxData3: any = {
        'id': '01',
        'href': '',
        'thumbnailHref': '',
        'sequence': '0',
        'title': 'Image Category 3',
        'description': 'Category 3',
        'tags': [{ 'tag': 'client', 'weight': '99' }, { 'tag': 'profile', 'weight': '99' }],
        'metadata': { 'some_attribute': 'some value' },
        'edit': false
    };
    lightboxData4: any = {
        'id': '01',
        'href': '',
        'thumbnailHref': '',
        'sequence': '0',
        'title': 'Image Category 4',
        'description': 'Category 4',
        'tags': [{ 'tag': 'client', 'weight': '99' }, { 'tag': 'profile', 'weight': '99' }],
        'metadata': { 'some_attribute': 'some value' },
        'edit': false
    };

    ngOnInit(): void {
        //   this.lightBoxList.push(this.lightboxData);
    }

    uploadModal() {
        this.showUploadMedia = !this.showUploadMedia;
    }
}
