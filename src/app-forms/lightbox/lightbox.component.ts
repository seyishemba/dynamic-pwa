import { LightboxService } from './lightbox.service';
import { Component, OnInit, AfterViewChecked, Input, Output, EventEmitter } from '@angular/core';
import lgZoom from 'lightgallery/plugins/zoom';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { DomSanitizer } from '@angular/platform-browser';
import { LightGallery } from 'lightgallery/lightgallery';
import { demoData } from './demo';
import { LightboxData } from './lightbox-data';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.css']
})
export class LightboxComponent implements OnInit, AfterViewChecked {
    /**
     * handles both previous and current images loaded to light box
     */
    @Input() lightboxData: Array<LightboxData> = [];
    demoData:any = demoData;
    files: Array<any> = [];
    touched:any = false;
    /**
     * handles current image  being added to lightbox
     */
    @Input() currentImage: LightboxData;
    /**
     *
     */
    private lightCallery!: LightGallery;
    /**
     * refreshes view after new image upload
     */
    private refresh = false;
    accepts = 'image/png, image/jpeg, image/jpg';
    @Output() uploadImage = new EventEmitter<boolean>();
  constructor(public sanitize: DomSanitizer, private service: LightboxService) { }
    ngAfterViewChecked(): void {
        if (this.refresh) {
            this.lightCallery.refresh();
        }
    }

    settings = {
        counter: true,
        plugins: [lgZoom],
        controls: true
    };
    onBeforeSlide = (detail: BeforeSlideDetail): void => {
        const { index, prevIndex } = detail;
        //console.log(index, prevIndex);
    };
    checkDefault(){
        if(!this.touched){
            // alert('Cannot show demo images, Please upload new image')
        }
    }
    defaultGallery(){
        //console.log(this.demoData)
         const newImage : LightboxData = {
                    href: this.demoData[0],
                    thumbnailHref: this.demoData[0],
                    sequence: '0',
                    title: 'Default Title',
                    description: 'Default Description',
                    tags: [{ "tag" : "client", "weight" : "99"}],
                    metadata: 'Default'
                }
                const newImage2 : LightboxData = {
                    href: this.demoData[1],
                    thumbnailHref: this.demoData[1],
                    sequence: '0',
                    title: 'Default Title',
                    description: 'Default Description',
                    tags: [{ "tag" : "client", "weight" : "99"}],
                    metadata: 'Default'
                }
                const newImage3 : LightboxData = {
                    href: this.demoData[2],
                    thumbnailHref: this.demoData[2],
                    sequence: '0',
                    title: 'Default Title',
                    description: 'Default Description',
                    tags: [{ "tag" : "client", "weight" : "99"}],
                    metadata: 'Default'
                }
            //     if(this.lightboxData.length == 0){
            //    this.handleFileData(newImage);
            //    this.handleFileData(newImage2);
            //    this.handleFileData(newImage3);
            //     }

    }

  ngOnInit(): void {
  }

  onInit =(detail): void => {
      //console.log('check', detail);
      this.lightCallery = detail.instance;
    this.defaultGallery()

  }

  safeUrl(file: any): any{
      return this.sanitize.bypassSecurityTrustResourceUrl(file);
  }

  /**
   * File upload from client machine method
   * @param file images
   */
  handleFileData(file: LightboxData){
    // {
    //     "href" : "https://images.google.com/someimage.jpg",
    //     "thumbnailHref" : "https://images.google.com/someimage.jpg",
    //     "sequence" : "0",
    //     "title" : "Happy Image",
    //     "description" : "This is a happy image",
    //     "tags" : [{ "tag" : "client", "weight" : "99"}, { "tag" : "profile", "weight" : "99"}],
    //     "metadata" : { "some_attribute" : "some value" }
    //   }
    //console.log(file)
    
        this.lightboxData.push(file);

    // this.lightboxData.thumbnailHref = files[0]
    //console.log(this.lightboxData)
  }
  onFileChange(file: any): void {
      /**
       * check if file object is not empty
       */
      if (file.target.files && file.target.files[0]) {
          /**
           * loops through the images for processing
           */
        //  for(const image of file.target.files) {
        //      /**
        //       * checks if file is an image
        //       */
        //      if (this.accepts.includes(image.type)) {
        //          /**
        //           * creates anew instance of file reader for every image
        //           */
        //          const reader = new FileReader();
        //          reader.onload =  (event: any) => {
        //              /**
        //               * adds the base64 image to the file list for uploading
        //               */
        //              this.currentImage.href = event.target.result,
        //              this.currentImage.thumbnailHref = event.target.result

        //              this.refresh = true;
        //             this.handleFileData(this.currentImage);
        //             this.refresh = true;
        //          };
        //          /**
        //           * reads the image and converts to base64
        //           */
        //          reader.readAsDataURL(image);
        //      }
        //  }
        if (this.accepts.includes(file.target.files[0].type)) {
            /**
             * creates anew instance of file reader for every image
             */
            const reader = new FileReader();
            reader.onload =  (event: any) => {
                /**
                 * adds the base64 image to the file list for uploading
                 */
            //console.log(event.target.result)

                const newImage : LightboxData = {
                    href: event.target.result,
                    thumbnailHref: event.target.result,
                    sequence: this.currentImage.sequence,
                    title: this.currentImage.title,
                    description: this.currentImage.description,
                    tags: this.currentImage.tags,
                    metadata: this.currentImage.metadata
                }  
                if(!this.touched){
                    this.lightboxData.pop();
                    this.lightboxData.pop();
                    this.lightboxData.pop();
                }else{
                this.touched = true;
                }

               this.handleFileData(newImage);
               this.refresh = true;
            };
            /**
             * reads the image and converts to base64
             */
            reader.readAsDataURL(file.target.files[0]);
            //console.log(reader.readAsDataURL(file.target.files[0]))
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

  upload() {
      this.uploadImage.emit(true);
  }
}


