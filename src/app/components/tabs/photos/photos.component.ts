import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  constructor() { }
  lightboxData:any ={
    "id": "01",
    "href": "",
    "thumbnailHref" : "",
    "sequence" : "0",
    "title" : "Happy Image",
    "description" : "This is a happy image",
    "tags" : [{ "tag" : "client", "weight" : "99"}, { "tag" : "profile", "weight" : "99"}],
    "metadata" : { "some_attribute" : "some value" }
  };

  ngOnInit(): void {
  }

}
        