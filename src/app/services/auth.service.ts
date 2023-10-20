import { Injectable } from '@angular/core';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import { AngularFireAuth} from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public ngFireAuth: AngularFireAuth) { }

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

  async signOut(){
    return await this.ngFireAuth.signOut()
  }

  async getProfile(){
    return await this.ngFireAuth.currentUser
  }
  async getUserName(): Promise<string> {
    const user = await this.getProfile();
    if (user) {
      // Puedes modificar esta lógica para obtener el nombre de usuario desde el usuario actual
      return user.displayName || '';
    }
    return '';
  }
}


