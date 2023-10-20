import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { Component, ElementRef, ViewChildren, ViewChild } from '@angular/core';
import { OnInit, QueryList } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  @ViewChildren('menuCard1', { read: ElementRef }) menuCards: QueryList<ElementRef>;

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
  async getUserName() {
    this.user = await this.authService.getUserName();
  }

  logOut() {
    this.authService.singOut().then((confirmed) => {
      if (confirmed) {
        this.route.navigate(['/login']);
      } else {
        // El usuario canceló la acción, no se cierra la sesión.
      }
    }).catch((error) => {
      console.log(error);
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

