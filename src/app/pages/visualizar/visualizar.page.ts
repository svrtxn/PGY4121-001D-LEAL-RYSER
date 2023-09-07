import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.page.html',
  styleUrls: ['./visualizar.page.scss'],
})
export class VisualizarPage implements OnInit {
  parametroIdEmpleado:number | undefined;

  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.parametroIdEmpleado = this.activatedRoute.snapshot.params['idempleado'];
    console.log("Parametro", this.parametroIdEmpleado);
  }

  ionViewWillEnter(){
    console.log("Cargando la vista");
  }

  ionViewDidEnter(){
    console.log("Vista cargada");
  }

  ionViewWillLeave(){
    console.log("Abandonando la vista");
  }

}