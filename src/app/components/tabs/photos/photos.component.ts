import { Component, OnInit } from '@angular/core';
import { LightboxData } from 'app-forms/lightbox/lightbox-data';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {Subject, Observable} from 'rxjs';
import { InspectionsService } from 'app/services/inspections/inspections.service';

@Component({
    selector: 'app-photos',
    templateUrl: './photos.component.html',
    styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
     // toggle webcam on/off
      public showWebcam = true;
      public allowCameraSwitch = true;
      public multipleWebcamsAvailable = false;
      public deviceId: string;
      public videoOptions: MediaTrackConstraints = {
        // width: {ideal: 1024},
        // height: {ideal: 576}
      };
      public errors: WebcamInitError[] = [];

      // latest snapshot
      public webcamImage: WebcamImage = null;

      // webcam snapshot trigger
      private trigger: Subject<void> = new Subject<void>();
      // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
      private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

    showUploadMedia = false;
    lightBoxList: Array<LightboxData> = [];
    lightBoxList2: Array<LightboxData> = [];
    lightBoxList3: Array<LightboxData> = [];
    lightBoxList4: Array<LightboxData> = [];
    imageModel: any
    constructor(private Inspections: InspectionsService) {
     }
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
        WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
    }

    uploadModal() {
        this.showUploadMedia = !this.showUploadMedia;
    }


  public triggerSnapshot(): void {
    this.trigger.next();
    this.handleupload();
  }
  public handleupload(){
    console.log(this.webcamImage.imageAsDataUrl)
    this.imageModel = this.webcamImage.imageAsDataUrl
    console.log(this.imageModel)

}

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.UploadblobFile(webcamImage.imageAsDataUrl)
  }

  UploadblobFile(file){
    this.Inspections.UploadblobFile(file).subscribe(data => {
        console.log(data)
      }, err => {
    });

  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

}
