import { InjectionToken } from "@angular/core";

const server:any = {
  "local" : {
    "url": "http://api.sentinel.care:44302/api",
  },
  "remote" : {
    "url" : "http://api.sentinel.care:44302/api"
  }
} 

function chooseServer(type:any){
  return server[type].url;
}

export const BASE_URL = new InjectionToken<string>('',{providedIn:"root",factory:()=> {
  return chooseServer('remote');
}});
