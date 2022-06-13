import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { Api } from 'app/api';
import { AuthService } from 'app/auth.service';
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

  constructor(public auth: AuthService) { }

  // get(){
  //     this.API.doGet(["id", 'pid'])
  //     .subscribe(data => {
  //       console.log(data)
  //     }, err => {
  //       console.log(err, 'err')
  //     });
  // }




  ngOnInit(): void {
  }

}
