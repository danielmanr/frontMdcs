import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of, tap} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Administrador } from '../../interfaces/Administrador';
import {response} from 'express';
import {Router} from '@angular/router';
import * as http from 'http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://127.0.0.1:8000/api/';
  private tokenKey = 'authToken';

  constructor(private httpClient:HttpClient, private router: Router) {}

  login(email:string, password:string): Observable<any>{
    console.log({email, password})
    return this.httpClient.post<any>(
      `${this.URL}auth/login`,
      {
            'email':email,
            'password':password}).pipe(
      tap(response => {
        if(response.access_token){
          console.log(response.access_token);
          this.setToken(response.access_token);
        }
      })
    )
  }


  private setToken(token:string): void {
    localStorage.setItem(this.tokenKey, token);
  }


  private getToken():string | null{
    return localStorage.getItem(this.tokenKey);
  }


  isAuthenticated(): boolean{
    const token = this.getToken();
    if(!token){
      return false;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  }

  logout():void{
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }


}
