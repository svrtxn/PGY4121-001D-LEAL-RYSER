import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, provideFirebaseApp(() => initializeApp({"projectId":"yoga-yoga-17cce","appId":"1:1011093677017:web:47f27aaa84429a5d40afc8","storageBucket":"yoga-yoga-17cce.appspot.com","apiKey":"AIzaSyAPFykXTPf3mwNlXvXfubrbTs3jx-x_TvU","authDomain":"yoga-yoga-17cce.firebaseapp.com","messagingSenderId":"1011093677017"})), provideAuth(() => getAuth())],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
