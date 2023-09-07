import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  contrasena: string = '';


  constructor() { }

  ngOnInit() {
  }

  // VER CONTRASEÑAs
  showPassword: boolean = false;
  showPassword2: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  togglePassword2() {
    this.showPassword2 = !this.showPassword2;
  }


}
