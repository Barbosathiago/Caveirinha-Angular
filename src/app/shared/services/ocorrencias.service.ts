import {Injectable} from '@angular/core'
import {Http, Headers, RequestOptions} from '@angular/http'
import {HttpClient, HttpParams} from '@angular/common/http'

import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/forkJoin'
import 'rxjs/add/operator/catch'

import {Ocorrencia, Dp, Veiculo, Proprietario, Tipo} from '../models/ocorrencia.model'

import {CAVEIRINHA_API} from '../../app.api'
import {ErrorHandler} from '../app.error-handler'

@Injectable()
export class OcorrenciasService {
  constructor(private http: HttpClient){}

  getTwoOcorrencias(id1: string, id2: string):Observable<Ocorrencia[]>{
    return Observable.forkJoin(
      this.http.get(`${CAVEIRINHA_API}/ocorrencias/${id1}`).catch(ErrorHandler.handleError),
      this.http.get(`${CAVEIRINHA_API}/ocorrencias/${id1}`).catch(ErrorHandler.handleError)
    )
  }

  registraOcorrencia(ocorrencia: Ocorrencia):Observable<string>{
    return this.http.post<string>(`${CAVEIRINHA_API}/ocorrencia`,ocorrencia)
                        .map(message => message['message'])
  }

  ocorrencias(local?:string, placa?: string, chassis?:string, numeroMotor?:string, nomeProp?:string, numeroOcorrencia?:string, dp_id?:string, tipoOcorrencia?:string, dataInicial?:string, dataFinal?:string, situacao?:string):Observable<Ocorrencia[]>{
    local = local ? local: ''
    placa = placa ? placa : ''
    chassis = chassis ? chassis : ''
    numeroMotor = numeroMotor ? numeroMotor : ''
    nomeProp = nomeProp ? nomeProp : ''
    numeroOcorrencia = numeroOcorrencia ? numeroOcorrencia : ''
    dp_id = dp_id ? dp_id : ''
    tipoOcorrencia = tipoOcorrencia ? tipoOcorrencia : ''
    dataInicial = dataInicial ? dataInicial : ''
    dataFinal = dataFinal ? dataFinal : ''
    situacao = situacao ? situacao : ''
    let params: HttpParams = undefined

    params = new HttpParams()
            .set('local', local)
            .set('placa', placa)
            .set('chassis', chassis)
            .set('numeroMotor', numeroMotor)
            .set('nomeProp', nomeProp)
            .set('numeroOcorrencia', numeroOcorrencia)
            .set('dp_id', dp_id)
            .set('tipoOcorrencia', tipoOcorrencia)
            .set('dataInicial', dataInicial)
            .set('dataFinal', dataFinal)
            .set('situacao', situacao)

    return this.http.get<Ocorrencia[]>(`${CAVEIRINHA_API}/ocorrencias`, {params: params})
  }

  ocorrenciasById(id: number): Observable<Ocorrencia>{
    return this.http.get(`${CAVEIRINHA_API}/ocorrencia/${id}`)
      .catch(ErrorHandler.handleError)
  }

  updateOcorrencia(ocorrencia: Ocorrencia): Observable<Ocorrencia>{
    console.log(ocorrencia)
    return this.http.put<Ocorrencia>(`${CAVEIRINHA_API}/ocorrencia`, ocorrencia)

  }

  ocorrenciasOfVeiculo(id: number): Observable<Ocorrencia[]>{
    return this.http.get<Ocorrencia[]>(`${CAVEIRINHA_API}/veiculo/${id}/ocorrencias`)
  }

  ocorrenciasOfDp(id: number): Observable<Ocorrencia[]>{
    return this.http.get(`${CAVEIRINHA_API}/dp/${id}/ocorrencias`)
      .catch(ErrorHandler.handleError)
  }

  veiculos(id: number): Observable<Veiculo[]>{
      return this.http.get(`${CAVEIRINHA_API}/veiculo/`)
      .catch(ErrorHandler.handleError)
  }

  registraVeiculo(veiculo: Veiculo): Observable<string>{
    return this.http.post<string>(`${CAVEIRINHA_API}/veiculo`, veiculo).map(response => response['id'])
    .catch(ErrorHandler.handleError)
  }

  updateVeiculo(veiculo: Veiculo): Observable<Veiculo>{
    return this.http.put<Veiculo>(`${CAVEIRINHA_API}/veiculo`, veiculo)
  }

  getAllDps():Observable<Dp[]>{
    return this.http.get<Dp[]>(`${CAVEIRINHA_API}/dps`)
      .map(response => {
        var result = response['dps']
        return result
      })
  }

  dpById(id: number): Observable<Dp>{
    return this.http.get(`${CAVEIRINHA_API}/dp/${id}`)
      .catch(ErrorHandler.handleError)
  }

  getAllTipos():Observable<Tipo[]>{
    return this.http.get<Tipo[]>(`${CAVEIRINHA_API}/ocorrencia/tipos`)
        .map(result => {
          var tipos = result['tipos']
          return tipos
        })
  }

  registraProprietario(proprietario: Proprietario):Observable<string>{
    return this.http.post<string>(`${CAVEIRINHA_API}/proprietario`, proprietario)
            .map(message => message['id'])
  }

  updateProprietario(proprietario: Proprietario):Observable<Proprietario>{
    return this.http.put<Proprietario>(`${CAVEIRINHA_API}/proprietario`, proprietario)
  }

  getProprietario(nome?: string): Observable<Proprietario[]>{
    let params: HttpParams
    if(nome){
      params = new HttpParams().set('nome', nome)
    }
    return this.http.get<Proprietario[]>(`${CAVEIRINHA_API}/proprietarios`, {params: params})
            .map(result => {
              return result['proprietarios']
            })
  }


}
