import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';



@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {
  usuarioActual: any;

  constructor(
    private storage: StorageService,
    private auth: AngularFireAuth
  ) { }

  ngOnInit() {
    
  }

 
}
