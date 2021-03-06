import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router'
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { TextMaskModule } from 'angular2-text-mask';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables'
import { ChartsModule } from '@progress/kendo-angular-charts';
import {AutoCompleteModule} from 'primeng/primeng'
import {ModalModule} from 'ngx-bootstrap/modal'


import { AppComponent } from './app.component';
import { CadastroOcorrenciaComponent } from './cadastro-ocorrencia/cadastro-ocorrencia.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ConsultarOcorrenciaComponent } from './consultar-ocorrencia/consultar-ocorrencia.component';
import {EdicaoOcorrenciaComponent} from './edicao-ocorrencia/edicao-ocorrencia.component'

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
    EdicaoOcorrenciaComponent,
  ],
  entryComponents:[
    EdicaoOcorrenciaComponent
  ],
  imports: [
    ChartsModule,
    TextMaskModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    DataTablesModule,
    AutoCompleteModule,
    ModalModule.forRoot(),
    RouterModule.forRoot(ROUTES),
    SharedModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
