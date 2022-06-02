import { InjectionToken } from "@angular/core";

const server:any = {
  "local" : {
    "url": "http://localhost:22742",
  },
  "remote" : {
    "url" : "https://live-api.manduu.work/"
  }
} 

function chooseServer(type:any){
  return server[type].url;
}

export const BASE_URL = new InjectionToken<string>('',{providedIn:"root",factory:()=> {
  return chooseServer('remote');
}});
