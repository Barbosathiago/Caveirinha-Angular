import {Injectable} from '@angular/core'
import {Http, Headers, RequestOptions} from '@angular/http'
import {HttpClient, HttpParams} from '@angular/common/http'

import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/forkJoin'
import 'rxjs/add/operator/catch'

import {Ocorrencia, Dp, Veiculo, Proprietario} from '../models/ocorrencia.model'

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

  ocorrencias(local?:string, placa?: string, chassis?:string, numeroMotor?:string, nomeProp?:string, numeroOcorrencia?:string, dp?:string, tipoOcorrencia?:string, dataInicial?:string, dataFinal?:string, situacao?:string):Observable<Ocorrencia[]>{
    local = local ? local: ''
    placa = placa ? placa : ''
    chassis = chassis ? chassis : ''
    numeroMotor = numeroMotor ? numeroMotor : ''
    nomeProp = nomeProp ? nomeProp : ''
    numeroOcorrencia = numeroOcorrencia ? numeroOcorrencia : ''
    dp = dp ? dp : ''
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
            .set('dp', dp)
            .set('tipoOcorrencia', tipoOcorrencia)
            .set('dataInicial', dataInicial)
            .set('dataFinal', dataFinal)
            .set('situacao', situacao)

    return this.http.get<Ocorrencia[]>(`${CAVEIRINHA_API}/ocorrencias`, {params: params})
      .catch(ErrorHandler.handleError)
  }

  ocorrenciasById(id: number): Observable<Ocorrencia>{
    return this.http.get(`${CAVEIRINHA_API}/ocorrencia/${id}`)
      .catch(ErrorHandler.handleError)
  }

  updateOcorrencia(ocorrencia: Ocorrencia): Observable<any>{
    console.log(ocorrencia)
    return this.http.put(`${CAVEIRINHA_API}/ocorrencia`, ocorrencia)

  }

  ocorrenciasOfVeiculo(id: number): Observable<Ocorrencia[]>{
    return this.http.get(`${CAVEIRINHA_API}/veiculo/${id}/ocorrencias`)
      .catch(ErrorHandler.handleError)
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

  veiculoById(id: number): Observable<Veiculo>{
    return this.http.get(`${CAVEIRINHA_API}/veiculo/${id}`)
      .catch(ErrorHandler.handleError)
  }

  veiculoOfOcorrencia(id: number): Observable<Veiculo>{
    return this.http.get(`${CAVEIRINHA_API}/ocorrencias/${id}/veiculo`)
      .catch(ErrorHandler.handleError)
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

  registraProprietario(proprietario: Proprietario):Observable<string>{
    return this.http.post<string>(`${CAVEIRINHA_API}/proprietario`, proprietario)
            .map(message => message['id'])
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
