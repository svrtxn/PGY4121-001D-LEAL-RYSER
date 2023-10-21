import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { Component, ElementRef, ViewChildren, ViewChild } from '@angular/core';
import { OnInit, QueryList } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Share } from '@capacitor/share';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  @ViewChildren('menuCard1', { read: ElementRef }) menuCards: QueryList<ElementRef>;
  @ViewChild(IonModal) modal: IonModal;

  private animation!: Animation;
  user: string = '';


  constructor(private helper: HelperService, private router: Router, private animationCtrl: AnimationController, public authService: AuthService, public route: Router) {
    this.menuCards = new QueryList<ElementRef>();
  }

  ngAfterViewInit() {
    this.menuCards.forEach((menuCard: ElementRef, index: number) => {
      this.animation = this.animationCtrl
        .create()
        .addElement(menuCard.nativeElement)
        .duration(800)
        .fromTo('transform', `translateX(${index * 80}px)`, 'translateX(0px)')
        .fromTo('opacity', '0', '1');
      this.animation.play();
    });
  }


  ionViewDidLeave() {
    this.animation.stop();
  }

  ngOnInit() {
    this.getUserName();
  }

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    if (root) {
      const backdropAnimation = this.animationCtrl
        .create()
        .addElement(root.querySelector('ion-backdrop')!)
        .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

      const wrapperAnimation = this.animationCtrl
        .create()
        .addElement(root.querySelector('.modal-wrapper')!)
        .keyframes([
          { offset: 0, opacity: '0', transform: 'scale(0)' },
          { offset: 1, opacity: '0.99', transform: 'scale(1)' },
        ]);

      return this.animationCtrl
        .create()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(500)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    }

    return this.animationCtrl.create();
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };

  async getUserName() {
    this.user = await this.authService.getUserName();
  }

  logOut() {
    this.authService.singOut().then((confirmed) => {
      if (confirmed) {
        this.route.navigate(['/login']);
      } else {

      }
    }).catch((error) => {
      console.log(error);
    });
  }

  async compartir() {
    await Share.share({
      title: 'COMPARTIR',
      text: `Descarga YOGAYOGA`,

    });
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

