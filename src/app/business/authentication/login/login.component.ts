import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {Administrador} from '../../../interfaces/Administrador';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class LoginComponent {

  email:string = '';
  password:string = '';
  constructor(private authService:AuthService, private router:Router) {}

  login():void{
    this.authService.login(this.email,this.password).subscribe({
      next:() => this.router.navigate(['home']),
      error: (err) => console.error('login fail', err)
    })
  }



}
