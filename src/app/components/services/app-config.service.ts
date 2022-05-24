import { Injectable } from '@angular/core';
import { SiteConfig } from "../common/configs/site-config";

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  
  public SiteConfig:any = SiteConfig;

  constructor() { }
}
