import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import {ROUTES} from './app.routes'
import {RouterModule} from '@angular/router'
import { AppComponent } from './app.component';
import { CadastroOcorrenciaComponent } from './cadastro-ocorrencia/cadastro-ocorrencia.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ConsultarOcorrenciaComponent } from './consultar-ocorrencia/consultar-ocorrencia.component';
import { SharedModule } from './shared/shared.module';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    AppComponent,
    CadastroOcorrenciaComponent,
    HeaderComponent,
    HomeComponent,
    ConsultarOcorrenciaComponent,
  ],
  imports: [
    TextMaskModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    SharedModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
