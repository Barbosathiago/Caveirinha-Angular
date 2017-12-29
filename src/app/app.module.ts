import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import {ROUTES} from './app.routes'
import {RouterModule} from '@angular/router'
import { AppComponent } from './app.component';
import { CadastroOcorrenciaComponent } from './cadastro-ocorrencia/cadastro-ocorrencia.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ConsultarOcorrenciaComponent } from './consultar-ocorrencia/consultar-ocorrencia.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    CadastroOcorrenciaComponent,
    HeaderComponent,
    HomeComponent,
    ConsultarOcorrenciaComponent,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    SharedModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
