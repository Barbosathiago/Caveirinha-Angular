import { Component, OnInit } from '@angular/core';
import { OcorrenciasService } from '../shared/services/ocorrencias.service'
import {Ocorrencia} from '../shared/models/ocorrencia.model'
@Component({
  selector: 'cav-consultar-ocorrencia',
  templateUrl: './consultar-ocorrencia.component.html',
})
export class ConsultarOcorrenciaComponent implements OnInit {

  ocorrencias: Ocorrencia[]

  constructor(private ocorrenciasService: OcorrenciasService) { }

  ngOnInit() {
    this.ocorrenciasService.ocorrencias()
      .subscribe(ocorrencias => this.ocorrencias = ocorrencias['ocorrencias'])
  }

}
