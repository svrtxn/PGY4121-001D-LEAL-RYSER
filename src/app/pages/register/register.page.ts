import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Comuna } from 'src/app/models/comuna';
import { Region } from 'src/app/models/region';
import { HelperService } from 'src/app/services/helper.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  regForm: FormGroup;
  user: string = '';
  regiones: Region[] = [];
  comunas: Comuna[] = [];
  regionSel: number = 0;
  comunaSel: number = 0;
  disabledComuna: boolean;

  constructor(
    private helper: HelperService,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    public router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.cargarRegion();

    this.regForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"),
        ],
      ],
      user: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/),
        ],
      ],
      repeatPassword: ['', [Validators.required]],
    }, {
      validator: this.passwordMatchValidator.bind(this),
    });
    this.getUserName();
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password').value;
    const repeatPassword = form.get('repeatPassword').value;

    if (password === repeatPassword) {
      return null; 
    } else {
      form.get('repeatPassword').setErrors({ passwordMismatch: true });
      return { passwordMismatch: true }; 
    }
  }

// REGISTRAR USUARIO
  async signUp() {
    const loading = await this.loadingCtrl.create();
    if (this.regForm.valid) {
      const email = this.regForm.value.email;
      const password = this.regForm.value.password;
      const username = this.regForm.value.user;
      const user = await this.authService.registerUser(email, password, username).catch((error) => {
        loading.dismiss();
        this.helper.showAlert("Las credenciales no son correctas", "Error");
      });
      if (user) {
        loading.dismiss();
        this.helper.mostrarToast('Registro exitoso');
        this.router.navigate(['/menu']);

      } else {
        loading.dismiss();
        this.helper.showAlert("Las credenciales no son correctas", "Error");
      }
    }
  }



  async getUserName() {
    this.authService.getUserName().then((username) => {
      this.user = username;
    });
  }

  // REGIONES Y COMUNAS
  async cargarRegion() {
    const req = await this.helper.getRegion();
    this.regiones = req.data;

  }

  async cargarComuna() {
    try {
      const req = await this.helper.getComuna(this.regionSel);
      this.comunas = req.data;
      this.disabledComuna = false;
    } catch (error: any) {
      await this.helper.showAlert(error.error.msg, "Error");
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
