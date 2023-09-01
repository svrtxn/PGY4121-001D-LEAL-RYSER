import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {


  // MODAL
  @ViewChild(IonModal) modal!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  // VALIDACIÓN USUARIO

  usuario: string = "";
  contrasena: string = "";

  constructor(private router: Router, private helper: HelperService) { }

  ngOnInit() {

  }

  async onLogin() {
    if (this.usuario == "") {
      this.helper.showAlert("Ingrese un usuario.", "Error")
      return;
    }
    if (this.contrasena == "") {
      this.helper.showAlert("Ingrese una contraseña.", "Error");
      return;
    }

    if (this.usuario == "admin" && this.contrasena == "123456789") {
      await this.helper.showLoading();
      this.router.navigateByUrl("menu");
    } else {
      this.helper.showAlert("Datos incorrectos.", "Error")
    }
  }



}
