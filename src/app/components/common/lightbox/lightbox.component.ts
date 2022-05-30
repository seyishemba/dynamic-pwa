import { LightboxService } from './lightbox.service';
import { Component, OnInit, AfterViewChecked, Input } from '@angular/core';
import lgZoom from 'lightgallery/plugins/zoom';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { DomSanitizer } from '@angular/platform-browser';
import { LightGallery } from 'lightgallery/lightgallery';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.css']
})
export class LightboxComponent implements OnInit, AfterViewChecked {
    @Input() lightboxData: any;
    files: Array<any> = [];
    private lightCallery!: LightGallery;
    private refresh = false;
    accepts = 'image/png, image/jpeg, image/jpg';
  constructor(public sanitize: DomSanitizer, private service: LightboxService) { }
    ngAfterViewChecked(): void {
        if (this.refresh) {
            this.lightCallery.refresh();
        }
    }

    settings = {
        counter: false,
        plugins: [lgZoom]
    };
    onBeforeSlide = (detail: BeforeSlideDetail): void => {
        const { index, prevIndex } = detail;
        console.log(index, prevIndex);
    };

  ngOnInit(): void {
  }

  onInit =(detail): void => {
      console.log('check', detail);
      this.lightCallery = detail.instance;
  }

  safeUrl(file: any): any{
      return this.sanitize.bypassSecurityTrustResourceUrl(file);
  }

  /**
   * File upload from client machine method
   * @param file images
   */
  handleFileData(files){
    // {
    //     "href" : "https://images.google.com/someimage.jpg",
    //     "thumbnailHref" : "https://images.google.com/someimage.jpg",
    //     "sequence" : "0",
    //     "title" : "Happy Image",
    //     "description" : "This is a happy image",
    //     "tags" : [{ "tag" : "client", "weight" : "99"}, { "tag" : "profile", "weight" : "99"}],
    //     "metadata" : { "some_attribute" : "some value" }
    //   }
    console.log(files)
    this.lightboxData.href = files[0]
    this.lightboxData.thumbnailHref = files[0]
    console.log(this.lightboxData)
  }
  onFileChange(file: any): void {
      /**
       * check if file object is not empty
       */
      if (file.target.files && file.target.files[0]) {
          /**
           * loops through the images for processing
           */
         for(const image of file.target.files) {
             /**
              * checks if file is an image
              */
             if (this.accepts.includes(image.type)) {
                 /**
                  * creates anew instance of file reader for every image
                  */
                 const reader = new FileReader();
                 reader.onload =  (event: any) => {
                     /**
                      * adds the base64 image to the file list for uploading
                      */
                     this.files.push(event.target.result);

                    this.refresh = true;
                    
                    this.handleFileData(this.files)
                 };
                 /**
                  * reads the image and converts to base64
                  */
                 reader.readAsDataURL(image);
             }
         }
         /**
          * upload files to the server
          */
         if (this.files.length > 0) {
             this.service.upload(this.files).subscribe((result: any) => {
                 /**
                  * deal with your results here
                  */
             })
         }
      }
  }

}


