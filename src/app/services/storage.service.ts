import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Preferences } from '@capacitor/preferences';

const keyStorageUser = "";
const keyStorageAsis = "";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private authFire: AngularFireAuth) { }

  async getItem(key: string): Promise<string | null> {
    const obj = await Preferences.get({ key: key });
    return obj.value;
  }

  async setItem(key: string, valor: string) {
    await Preferences.set({ key: key, value: valor });
  }

  async guardarUsuario(usuario) {
    const usuariosRegistrados = await this.getItem(keyStorageUser);

    if (usuariosRegistrados) {
      let usuariosParseados = JSON.parse(usuariosRegistrados);
      usuariosParseados.push(usuario);
      await this.setItem(keyStorageUser, JSON.stringify(usuariosParseados));
      return true;
    }

    await this.setItem(keyStorageUser, JSON.stringify([usuario]));
  }


  async guardarAsistencia(asistencia) {
    const asistencias = await this.getItem(keyStorageAsis);

    if (asistencias) {
      let asistenciasParseadas = JSON.parse(asistencias);
      asistenciasParseadas.push(asistencia);
      await this.setItem(keyStorageUser, JSON.stringify(asistenciasParseadas));
      console.log(asistenciasParseadas);
    } else {
      await this.setItem(keyStorageUser, JSON.stringify([asistencia]));
    }

    return true;
  }



  async usuarioActual(usuario) {
    
  }



}
