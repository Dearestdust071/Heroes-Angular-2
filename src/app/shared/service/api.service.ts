import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000/api'

  constructor(private http: HttpClient) { }

  getItems(Module: string, Accion: string = ''): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${Module}${this.accionValor(Accion)}`);
  }

  getItem(Module: string, id: number, Accion: string = ''): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${Module}${this.accionValor(Accion)}/${id}`);
  }

  postItem(Module: string, data: any, Accion: string = ''): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${Module}${this.accionValor(Accion)}`, data);
  }

  putItem(Module: string, id: number, data: any, Accion: string = ''): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${Module}/${this.accionValor(Accion)}/${id}`, data);
  }

  deleteItem(Module: string, id: number, Accion: string = ''): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${Module}${this.accionValor(Accion)}/${id}`);
  }

  accionValor(Accion: string){
    return Accion != '' ? `/${Accion}` : '';
  }

}