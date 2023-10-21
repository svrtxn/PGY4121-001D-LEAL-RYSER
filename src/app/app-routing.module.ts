import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

const redireccionar = () => redirectUnauthorizedTo(['/login']);

const routes: Routes = [
  {
    path: 'home', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redireccionar },
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)

  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'menu', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redireccionar },
    loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'escanear', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redireccionar },
    loadChildren: () => import('./pages/escanear/escanear.module').then(m => m.EscanearPageModule)
  },
  {
    path: 'info-qr', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redireccionar },
    loadChildren: () => import('./pages/info-qr/info-qr.module').then(m => m.InfoQrPageModule)
  },
  {
    path: 'visualizar', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redireccionar },
    loadChildren: () => import('./pages/visualizar/visualizar.module').then(m => m.VisualizarPageModule)
  },
  {
    path: 'info-clase/:clase', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redireccionar },
    loadChildren: () => import('./pages/info-clase/info-clase.module').then(m => m.InfoClasePageModule)
  },

  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
  },












];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
