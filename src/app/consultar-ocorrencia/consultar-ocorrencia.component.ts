import { Component, OnInit } from '@angular/core';
import { OcorrenciasService } from '../shared/services/ocorrencias.service'
import {Ocorrencia} from '../shared/models/ocorrencia.model'
@Component({
  selector: 'cav-consultar-ocorrencia',
  templateUrl: './consultar-ocorrencia.component.html',
})
export class ConsultarOcorrenciaComponent implements OnInit {

  ocorrencias: Ocorrencia[]
  searched: boolean = false

  constructor(private ocorrenciasService: OcorrenciasService) { }

  ngOnInit() {
  }

  pesquisarOcorrencias(placa, motor, chassis){
    if (!this.searched) {
      this.searched = true
    }
    this.ocorrenciasService.ocorrencias(placa, motor, chassis, '').subscribe(result => this.ocorrencias = result['ocorrencias'])
  }

}
