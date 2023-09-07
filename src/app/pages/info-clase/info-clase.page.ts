import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-clase',
  templateUrl: './info-clase.page.html',
  styleUrls: ['./info-clase.page.scss'],
})
export class InfoClasePage implements OnInit {
  clase!: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // Captura el valor de ":clase" de la URL
    this.route.params.subscribe(params => {
      this.clase = params['clase'];

      // Luego, puedes utilizar this.clase para actualizar la información en tu HTML
      // Por ejemplo, puedes hacer una solicitud HTTP para obtener los detalles de la clase
      // y mostrarlos en el HTML.
    });
  }
}
