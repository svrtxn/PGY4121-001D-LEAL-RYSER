import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  email: string ='';
  password: string ='';
  contrasena: string = '';

  regForm: FormGroup

  constructor(public formBuilder:FormBuilder, public loadingCtrl: LoadingController, public authService:AuthService) { }

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

async signUp (){
  const loading = await this.loadingCtrl.create();
  await loading.present();
  if(this.regForm?.valid){
   // const user = await this.authService.registerUser(email, password)
  }
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
