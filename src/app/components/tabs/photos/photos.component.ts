import { Component, Injector, Input, OnInit } from '@angular/core';
import { LightboxData } from 'app-forms/lightbox/lightbox-data';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { InspectionsService } from 'app/services/inspections/inspections.service';
import { GetLightboxForViewDto, LightboxesServiceProxy } from '@shared/service-proxies/service-proxies';
import { FileItem, FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { TokenService } from '@app/token.service';
import { IAjaxResponse } from 'abp-ng2-module';
import { AppConsts } from '@shared/AppConsts';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  @Input() inspectionId: any;
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
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  showUploadMedia = false;
  lightBoxViewList: Array<GetLightboxForViewDto> = [];
  lightboxDataList: Array<LightboxData[]> = [];
  imageModel: any
  blobFileToken: string;
  blobFileUploader: FileUploader;


  constructor(private Inspections: InspectionsService,
    injector: Injector,
    private _lightboxesServiceProxy: LightboxesServiceProxy, private _token: TokenService) {
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
    console.log("InspectionId: " + this.inspectionId, this._lightboxesServiceProxy);

    this.getLightboxForInspection("", this.inspectionId).subscribe((result) => {
      console.log(result.items);
      for (let idx = 0; idx < result.totalCount; idx++) {
        let lightboxForView = result.items[idx];
        let createLightboxData = this.createLightboxData(
          lightboxForView.lightbox.fileContents,
          lightboxForView.lightbox.name + '(' + lightboxForView.lightbox.tags + ')',
          lightboxForView.lightbox.description);

        this.lightBoxViewList.push(lightboxForView);
        this.lightboxDataList.push(createLightboxData);
      }
    })

    this.initFileUploader()
  }

  getLightboxForInspection(tag: "Interior" | "Exterior" | "Hover" | "Roofing" | "", inspectionId: number) {
    return this._lightboxesServiceProxy.getAll(
      undefined,
      undefined,
      undefined,
      undefined,
      tag,
      undefined,
      0,
      inspectionId,
      inspectionId,
      undefined,
      undefined,
      undefined
    )
  }

  createLightboxData(fileContent: string[], title: string, description: string) {
    let lightboxArray: LightboxData[] = []
    fileContent.forEach((value) => {
      if (value) {
        let fileUrl = value;
        lightboxArray.push({
          href: fileUrl,
          thumbnailHref: fileUrl,
          sequence: '0',
          title: title,
          description: description,
          tags: [{ "tag": "client", "weight": "99" }],
          metadata: 'Default'
        })
      }
    })
    return lightboxArray;
  }

  uploadModal() {
    this.showUploadMedia = !this.showUploadMedia;
  }


  public triggerSnapshot(): void {
    this.trigger.next();
    this.handleupload();
  }
  public handleupload() {
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

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
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

  UploadblobFile(file) {
    // this.Inspections.UploadblobFile(file).subscribe(data => {
    //   console.log(data)
    // }, err => {
    // });

    let mimeType = PhotosComponent.detectMimeType(file); //get mime type from b64 string
    if (mimeType) {
      let filename = mimeType.replace(/\//, '.')

      let startUploadProcess = (file) => {
        let files: File[] = [file];
        this.uploader.clearQueue();
        this.uploader.addToQueue(files);
        this.uploader.uploadAll();
      }

      this.urltoFile(file, filename, mimeType).then(function (file) {
        startUploadProcess(file)
      });

    }
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  public saving = false;
  public uploader: FileUploader;
  private _uploaderOptions: FileUploaderOptions = {};

  initFileUploader(): void {
    this.uploader = new FileUploader({ url: AppConsts.remoteServiceBaseUrl + '/FileObjects/UploadblobFile' });
    this._uploaderOptions.autoUpload = false;
    this._uploaderOptions.authToken = 'Bearer ' + this._token.getToken();
    this._uploaderOptions.removeAfterUpload = true;
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onBuildItemForm = (fileItem: FileItem, form: any) => {
      form.append('FileType', fileItem.file.type);
      form.append('FileName', 'captured_image');
      form.append('FileToken', this.guid());
    };

    this.uploader.onSuccessItem = (item, response, status) => {
      const resp = JSON.parse(response);
      if (resp.success) {
        this.blobFileToken = resp.result.fileToken
        alert(this.blobFileToken)
        this.createfile (this.blobFileToken)
      } else {
        console.error(resp.result.message);
        console.error(resp.error.message);
      }
    };
    this.uploader.setOptions(this._uploaderOptions);
  }
  createfile(token){
    this.docreatefile(token)
  }
  docreatefile(token){
    //alert("calling")
    var fileObject={
  "blob":token,
  "blobToken": token,
  "metadata": "string",
  "storageAccount": 0,
  "id": 0
}
this.Inspections.createFile(fileObject)
  }
  guid(): string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  urltoFile(url: RequestInfo, filename: string, mimeType: any) : Promise<File> {
    return (fetch(url)
      .then(function (res) { return res.arrayBuffer(); })
      .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
    );
  }


  static B64_SIGNATURES = {
    "JVBERi0": "application/pdf",
    "R0lGODdh": "image/gif",
    "R0lGODlh": "image/gif",
    "iVBORw0KGgo": "image/png",
    "/9j/": "image/jpg"
  };

  static detectMimeType(b64: string) {
    if (b64) {
      let startIdx = b64.indexOf("base64,");
      startIdx = startIdx > -1 ? startIdx + 7 : 0;
      b64 = b64.substring(startIdx);
      for (var s in PhotosComponent.B64_SIGNATURES) {
        if (b64.indexOf(s) === 0) {
          return PhotosComponent.B64_SIGNATURES[s];
        }
      }
    }
    return null
  }
}
