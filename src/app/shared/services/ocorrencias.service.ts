import {Injectable} from '@angular/core'
import {Http, Headers, RequestOptions} from '@angular/http'

import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import {Ocorrencia, Dp, Veiculo} from '../models/ocorrencia.model'

import {CAVEIRINHA_API} from '../../app.api'
import {ErrorHandler} from '../app.error-handler'

@Injectable()
export class OcorrenciasService {
  constructor(private http: Http){}

  registraOcorrencia(ocorrencia: Ocorrencia){
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.post(`${CAVEIRINHA_API}/ocorrencias`,
                          JSON.stringify(ocorrencia),
                          new RequestOptions({headers: headers})
                        ).map(response => response.json())
                        .map(message => message['message'])
  }

  ocorrencias():Observable<Ocorrencia[]>{
    return this.http.get(`${CAVEIRINHA_API}/ocorrencias`)
      .map(response => {
        var result = response.json()
        console.log(result)
        return result
      })
      .catch(ErrorHandler.handleError)
  }

  ocorrenciasById(id: number): Observable<Ocorrencia>{
    return this.http.get(`${CAVEIRINHA_API}/ocorrencias/${id}`)
      .map(reponse => reponse.json())
      .catch(ErrorHandler.handleError)
  }

  ocorrenciasOfVeiculo(id: number): Observable<Ocorrencia[]>{
    return this.http.get(`${CAVEIRINHA_API}/veiculo/${id}/ocorrencias`)
      .map(response => response.json())
      .catch(ErrorHandler.handleError)
  }

  ocorrenciasOfDp(id: number): Observable<Ocorrencia[]>{
    return this.http.get(`${CAVEIRINHA_API}/dp/${id}/ocorrencias`)
      .map(reponse => reponse.json())
      .catch(ErrorHandler.handleError)
  }

  veiculos(id: number): Observable<Veiculo[]>{
    return this.http.get(`${CAVEIRINHA_API}/veiculo/`)
      .map(response => response.json())
      .catch(ErrorHandler.handleError)
  }
  veiculoById(id: number): Observable<Veiculo>{
    return this.http.get(`${CAVEIRINHA_API}/veiculo/${id}`)
      .map(reponse => reponse.json())
      .catch(ErrorHandler.handleError)
  }

  veiculoOfOcorrencia(id: number): Observable<Veiculo>{
    return this.http.get(`${CAVEIRINHA_API}/ocorrencias/${id}/veiculo`)
      .map(reponse => reponse.json())
      .catch(ErrorHandler.handleError)
  }

  dp():Observable<Dp[]>{
    return this.http.get(`${CAVEIRINHA_API}/dp`)
      .map(reponse => reponse.json())
      .catch(ErrorHandler.handleError)
  }
  dpById(id: number): Observable<Dp>{
    return this.http.get(`${CAVEIRINHA_API}/dp/${id}`)
      .map(reponse => reponse.json())
      .catch(ErrorHandler.handleError)
  }


}
