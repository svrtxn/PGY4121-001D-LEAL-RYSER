import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  email:any
  constructor(public route:Router, public authService:AuthService,) { }

  ngOnInit() {
  }
  
  async resetPassword() {
    this.authService.resetPassword(this.email)
    this.route.navigate(['/login']
    ).catch((error) => {
      console.log(error);
    })
  }
}
