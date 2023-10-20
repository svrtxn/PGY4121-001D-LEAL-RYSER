import { Component, OnInit, ViewChild } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { AnimationController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  loginForm: FormGroup


  constructor(private router: Router, private helper: HelperService, private animationCtrl: AnimationController, public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"),
      ]],


      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/),
      ]]

    });
  }

  get errorControl() {
    return this.loginForm?.controls;

  }


  async login() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if (this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .then(user => {
          loading.dismiss();
          this.helper.mostrarToast('Inicio de sesión exitoso');
          this.router.navigate(['/menu']);

        })
        .catch(error => {
          loading.dismiss();
        });
    }
    else {
      loading.dismiss();
      this.helper.showAlert("Las credenciales no son correctas", "Error");
    }
  }

  // VER CONTRASEÑA
  showPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }


}
