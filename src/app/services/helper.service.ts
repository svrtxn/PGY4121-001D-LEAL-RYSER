import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/apiResponse';
import { Region } from '../models/region';
import { environment } from 'src/environments/environment';
import { Comuna } from '../models/comuna';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class HelperService {

  constructor(private http: HttpClient, private alertService: AlertController, private loadingCtrl: LoadingController, private router: Router, private toastController: ToastController) { }

  async showAlert(msg: string, title: string) {
    var alert = await this.alertService.create({ cssClass: "alertClass", message: msg, header: title, buttons: ['Aceptar'] })
    await alert.present();
    return alert;
  }

  async getRegion() {
    const observable = this.http.get<ApiResponse<Region>>(`${environment.apiUrl}region`);
    const promise = observable.toPromise();
    return await promise;
  }

  async getComuna(idRegion: number) {
    const observable = this.http.get<ApiResponse<Comuna>>(`${environment.apiUrl}comuna/` + idRegion);
    const promise = observable.toPromise();
    return await promise;
  }


  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
      position: 'top',
      color: 'success',
    });
    toast.present();
  }
}
