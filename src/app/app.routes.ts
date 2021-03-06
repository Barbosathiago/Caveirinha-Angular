import {Routes} from '@angular/router'

import {HomeComponent} from './home/home.component'
import {CadastroOcorrenciaComponent} from './cadastro-ocorrencia/cadastro-ocorrencia.component'
import {ConsultarOcorrenciaComponent} from './consultar-ocorrencia/consultar-ocorrencia.component'
import {RelatoriosComponent} from './relatorios/relatorios.component'

export const ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cadastro', component: CadastroOcorrenciaComponent},
  {path: 'consulta', component: ConsultarOcorrenciaComponent},
  {path: 'relatorios', component: RelatoriosComponent}
]
