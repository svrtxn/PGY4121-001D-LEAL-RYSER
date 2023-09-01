import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
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
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuPageModule)
  },
  {
    path: 'menu-uno/:id',
    loadChildren: () => import('./pages/menu-uno/menu-uno.module').then(m => m.MenuUnoPageModule)
  },
  {
    path: 'menu-dos/:id',
    loadChildren: () => import('./pages/menu-dos/menu-dos.module').then(m => m.MenuDosPageModule)
  },
  {
    path: 'menu-tres/:id',
    loadChildren: () => import('./pages/menu-tres/menu-tres.module').then(m => m.MenuTresPageModule)
  },
  {
    path: 'menu-cuatro/:id',
    loadChildren: () => import('./pages/menu-cuatro/menu-cuatro.module').then(m => m.MenuCuatroPageModule)
  },  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
