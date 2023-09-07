import { Component, ElementRef, ViewChildren, ViewChild } from '@angular/core';
import { OnInit, QueryList } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';

@Component({
  selector: 'app-info-qr',
  templateUrl: './info-qr.page.html',
  styleUrls: ['./info-qr.page.scss'],
})
export class InfoQrPage implements OnInit {
  @ViewChildren('menuCard1', { read: ElementRef }) menuCards: QueryList<ElementRef>;

  private animations: Animation[] = [];

  constructor(private animationCtrl: AnimationController) {
    this.menuCards = new QueryList<ElementRef>();
  }

  ngOnInit() {
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
}
