import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.page.html',
  styleUrls: ['./visualizar.page.scss'],
})
export class VisualizarPage implements OnInit {
  clase!: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {

  };


  InfoClasePage(clase: string) {
    this.clase = clase;
    this.router.navigateByUrl('info-clase/' + this.clase);
  }

  ionViewWillEnter() {

  }

  ionViewDidEnter() {

  }

  ionViewWillLeave() {

  }

}