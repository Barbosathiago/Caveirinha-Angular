import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router'
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { TextMaskModule } from 'angular2-text-mask';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables'
import { ChartsModule } from '@progress/kendo-angular-charts';

import { AppComponent } from './app.component';
import { CadastroOcorrenciaComponent } from './cadastro-ocorrencia/cadastro-ocorrencia.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ConsultarOcorrenciaComponent } from './consultar-ocorrencia/consultar-ocorrencia.component';

import {ROUTES} from './app.routes';
import { RelatoriosComponent } from './relatorios/relatorios.component'

@NgModule({
  declarations: [
    AppComponent,
    CadastroOcorrenciaComponent,
    HeaderComponent,
    HomeComponent,
    ConsultarOcorrenciaComponent,
    RelatoriosComponent,
  ],
  imports: [
    ChartsModule,
    TextMaskModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    DataTablesModule,
    RouterModule.forRoot(ROUTES),
    SharedModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
