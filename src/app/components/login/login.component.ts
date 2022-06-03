import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { Api } from '../../../app/api';
import { finalize, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  env:any = environment;

  constructor(public API: Api) { }

  get(){
      this.doGet()
      .subscribe(data => {
        console.log(data)
      }, err => {
        console.log(err, 'err')
      });
  }

  doGet():Observable<any> {
    let params = new Map<string, any>([ ["id", 'pid']]);
    return this.API.get("api/services/app/PosImages/GetProductImages", params);
  }


  post(){
    this.doPost().subscribe(
        result => console.log(result),
        err => console.log(err)
      );
  }

  doPost():Observable<any> {
    return this.API.post("api/services/app/ShoppingCarts/ApplyDiscount", 'data')
      .pipe(map((result: any) => {
        return result;
      }))
  }

  ngOnInit(): void {
  }

}
