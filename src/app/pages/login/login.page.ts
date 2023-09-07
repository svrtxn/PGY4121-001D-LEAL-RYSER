import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {



  constructor(private router: Router, private helper: HelperService, private animationCtrl: AnimationController) { }

  ngOnInit() {

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
