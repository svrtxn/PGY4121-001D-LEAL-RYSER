import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import type { Animation } from '@ionic/angular';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})

export class MenuPage implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {
  }


  logOut() {
    this.router.navigateByUrl("login");
  }

  menuUno() {
    
    this.router.navigateByUrl("/menu-uno");
  }

  menuDos() {
    var parametroId = "id:" + 67890;
    this.router.navigateByUrl("/menu-dos/" + parametroId);
  }

  menuTres() {
    var parametroId = "id:" + 23456;
    this.router.navigateByUrl("/menu-tres/" + parametroId);
  }

  menuCuatro() {
    var parametroId = "id:" + 78901;
    this.router.navigateByUrl("/menu-cuatro/" + parametroId);
  }


}
