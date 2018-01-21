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

  ocorrencias(placa?: string, numeroMotor?:string, chassis?: string, situacao?:string):Observable<Ocorrencia[]>{
    placa = placa ? placa : ''
    numeroMotor = numeroMotor ? numeroMotor : ''
    chassis = chassis ? chassis : ''
    situacao = situacao ? situacao : ''
    let params: HttpParams = undefined
    params = new HttpParams().set('placa', placa)
                            .set('numeroMotor', numeroMotor)
                            .set('chassis', chassis)
                            .set('situacao', situacao)
    return this.http.get<Ocorrencia[]>(`${CAVEIRINHA_API}/ocorrencias`, {params: params})
      .catch(ErrorHandler.handleError)
  }

  ocorrenciasById(id: number): Observable<Ocorrencia>{
    return this.http.get(`${CAVEIRINHA_API}/ocorrencias/${id}`)
      .catch(ErrorHandler.handleError)
  }

  updateOcorrencia(id: number, ocorrencia: Ocorrencia): Observable<Ocorrencia>{
    return this.http.put(`${CAVEIRINHA_API}/ocorrencias/${id}`, ocorrencia)
      .catch(ErrorHandler.handleError)
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
