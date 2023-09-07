import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { Component, ElementRef, ViewChildren, ViewChild } from '@angular/core';
import { OnInit, QueryList } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  @ViewChildren('menuCard1', { read: ElementRef }) menuCards: QueryList<ElementRef>;

  private animations: Animation[] = [];
  username: string | null = null;

  constructor(private helper: HelperService, private router: Router, private animationCtrl: AnimationController) {
    this.menuCards = new QueryList<ElementRef>();
    this.username = this.helper.getUsername();
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit() ejecutado');
    this.menuCards.forEach((menuCard: ElementRef, index: number) => {
      const animation = this.animationCtrl
        .create()
        .addElement(menuCard.nativeElement)
        .duration(800)
        .fromTo('transform', `translateX(${index * 80}px)`, 'translateX(0px)')
        .fromTo('opacity', '0', '1');
      this.animations.push(animation);
      animation.play();
    });
  }

  ngOnDestroy() {
    this.animations.forEach(animation => animation.destroy());
  }

  ngOnInit() {

  }

  logOut() {
    this.helper.showAletarLogOut();
    
  }

  visualizar() {
    this.router.navigateByUrl('/visualizar');
  }

  menuTres() {
    var parametroId = 'id:' + 23456;
    this.router.navigateByUrl('/menu-tres/' + parametroId);
  }

  menuCuatro() {
    var parametroId = 'id:' + 78901;
    this.router.navigateByUrl('/menu-cuatro/' + parametroId);
  }
}
