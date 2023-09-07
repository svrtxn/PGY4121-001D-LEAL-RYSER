import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private alertService: AlertController, private loadingCtrl: LoadingController) { }

  async showAlert(msg: string, title: string) {
    var alert = await this.alertService.create({ cssClass: "alertClass", message: msg, header: title, buttons: ['Aceptar'] })
    await alert.present();
    return alert;
  }

  async showLoading() {
    return new Promise<void>(async (resolve) => {
      const loading = await this.loadingCtrl.create({
        message: 'Cargando....',
        duration: 180,
      });

      await loading.present();
      resolve();
    });
  }

  private username: string | null = null;

  setUsername(username: string) {
    this.username = username;
  }

  getUsername(): string | null {
    return this.username;
  }
}
