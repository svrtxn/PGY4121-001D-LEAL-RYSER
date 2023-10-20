import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  

  regForm: FormGroup
  user: string = '';
  constructor(public formBuilder:FormBuilder, public loadingCtrl: LoadingController, public authService:AuthService, public router : Router) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
    email : ['', [
      Validators.required,
      Validators.email,
      Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"),
    ]],
    user : ['',[
      Validators.required
    ]],

    password:['',[
      Validators.required, 
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/),
    ]], 
    repeatPassword: ['', [Validators.required]],
  }, {
   validator: this.passwordMatchValidator,
  });
  this.getUserName();
}

passwordMatchValidator(form: FormGroup) {

const password = form.get('password').value;
 const repeatPassword = form.get('repeatPassword').value;

  if (password === repeatPassword) {
    return null; // Las contraseñas coinciden, no hay error
 } else {
    form.get('repeatPassword').setErrors({ passwordMismatch: true }); // Configura el error para el campo repeatPassword
    return { passwordMismatch: true }; // Las contraseñas no coinciden, se genera un error
  }
}

get errorControl(){
  return this.regForm?.controls;

}
async signUp() {
  const loading = await this.loadingCtrl.create();
  await loading.present();
  if(this.regForm?.valid){
    const email = this.regForm.value.email;
    const password = this.regForm.value.password;
    const username = this.regForm.value.user;
    const user = await this.authService.registerUser(this.regForm.value.email, this.regForm.value.password, this.regForm.value.user).catch((error)=>{

     console.log(error);
     loading.dismiss();   
   })
   if (user){
     loading.dismiss();
     this.router.navigate(['/menu']);
   }else{
  
    console.log('Valores incorrectos')
    }
   }
 }
 async getUserName() {
  console.log('Obteniendo nombre de usuario...');
  this.authService.getUserName().then((username) => {
    console.log('Nombre de usuario obtenido:', username);
    this.user = username;
  });
}




  // VER CONTRASEÑAs
  showPassword: boolean = false;
  showPassword2: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  togglePassword2() {
    this.showPassword2 = !this.showPassword2;
  }

}
