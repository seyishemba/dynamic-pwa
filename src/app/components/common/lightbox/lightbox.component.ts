import { LightboxService } from './lightbox.service';
import { Component, OnInit, AfterViewChecked } from '@angular/core';
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

// export class FileUploadComponent implements OnInit {

//   // Variable to store shortLink from api response
//   shortLink: string = "";
//   loading: boolean = false; // Flag variable
//   file: any; // Variable to store file

//   // Inject service
//   constructor(private fileUploadService: FileUploadService) { }

//   ngOnInit(): void {
//   }

//   // On file Select
//   onChange(event) {
//       this.file = event.target.files[0];
//   }
//   // OnClick of button Upload
//   onUpload() {
//       this.loading = !this.loading;
//       console.log(this.file);
//       this.fileUploadService.upload(this.file).subscribe(
//           (event: any) => {
//               if (typeof (event) === 'object') {

//                   // Short link via api response
//                   this.shortLink = event.link;

//                   this.loading = false; // Flag variable
//               }
//           }
//       );
//   }
