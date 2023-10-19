import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { AnimationController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { async } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  loginForm : FormGroup


  constructor(private router: Router, private helper: HelperService, private animationCtrl: AnimationController, public formBuilder:FormBuilder, public loadingCtrl: LoadingController, public authService:AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
    email : ['', [
      Validators.required,
      Validators.email,
      Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"),
    ]],
   

    password:['',[
      Validators.required, 
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/),
    ]]

  });
}
get errorControl(){
  return this.loginForm?.controls;

}

async signUp (){
  const loading = await this.loadingCtrl.create();
  await loading.present();
  if(this.loginForm?.valid){
   // const user = await this.authService.registerUser(email, password)
  }
}

  // VER CONTRASEÑA
  showPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }


  // MODAL
  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    if (root) {
      const backdropAnimation = this.animationCtrl
        .create()
        .addElement(root.querySelector('ion-backdrop')!)
        .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

      const wrapperAnimation = this.animationCtrl
        .create()
        .addElement(root.querySelector('.modal-wrapper')!)
        .keyframes([
          { offset: 0, opacity: '0', transform: 'scale(0)' },
          { offset: 1, opacity: '0.99', transform: 'scale(1)' },
        ]);

      return this.animationCtrl
        .create()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(500)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    }

    return this.animationCtrl.create();
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };


  // VALIDACIÓN USUARIO

  username: string = "";
  contrasena: string = "";

  async onLogin() {
    if (this.username == "") {
      this.helper.showAlert("Ingrese un usuario.", "Error")
      return;
    }
    if (this.contrasena == "") {
      this.helper.showAlert("Ingrese una contraseña.", "Error");
      return;
    }

    if (this.username == "pgy4121-001d" && this.contrasena == "pgy4121-001d") {
      await this.helper.showLoading();
      this.helper.setUsername(this.username);
      this.router.navigateByUrl('/menu');
    } else {
      this.helper.showAlert("Datos incorrectos.", "Error")
    }
  }



}
