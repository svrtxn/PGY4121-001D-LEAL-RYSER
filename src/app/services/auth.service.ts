import { Injectable } from '@angular/core';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private alertService: AlertController, public ngFireAuth: AngularFireAuth) { }

  async registerUser(email:string, password:string, username: string){
    const userCredential = await this.ngFireAuth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    if (user) {
      await user.updateProfile({ displayName: username });
    }
    return userCredential;
  }

  async loginUser(email:string, password:string){
    return await this.ngFireAuth.signInWithEmailAndPassword(email, password)
  }
  
  async resetPassword(email:string){
    return await this.ngFireAuth.sendPasswordResetEmail(email)
  }

  async singOut(): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      const alert = await this.alertService.create({
        header: 'Cerrar Sesión',
        message: '¿Estás seguro de que quieres cerrar sesión?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              resolve(false); // Se cancela 
            },
          },
          {
            text: 'Cerrar Sesión',
            handler: async () => {
              await this.ngFireAuth.signOut();
              resolve(true); // Se confirma 
            },
          },
        ],
      });
  
      await alert.present();
    });
  }
  
  async getProfile(){
    return await this.ngFireAuth.currentUser
  }
  async getUserName(): Promise<string> {
    const user = await this.getProfile();
    if (user) {
      return user.displayName || '';
    }
    return '';
  }
}


