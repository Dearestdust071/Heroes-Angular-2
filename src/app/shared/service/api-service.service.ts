import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {


  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getItems(Module: string, Accion: string = ''): Observable<any[]> {
    let AccionValor = Accion != '' ? `/${Accion}` : '';
    return this.http.get<any[]>(`${this.apiUrl}/${Module}${AccionValor}`);
  }

  getItem(Module: string, id: number, Accion: string = ''): Observable<any> {
    let AccionValor = Accion != '' ? `/${Accion}` : '';
    return this.http.get<any>(`${this.apiUrl}/${Module}${AccionValor}/${id}`);
  }

  postItem(Module: string, data: any, Accion: string = ''): Observable<any> {
    let AccionValor = Accion != '' ? `/${Accion}` : '';
    return this.http.post<any>(`${this.apiUrl}/${Module}${AccionValor}`, data);
  }

  updateItem(Module: string, id: number, data: any, Accion: string = ''): Observable<any> {
    let AccionValor = Accion != '' ? `/${Accion}` : '';
    return this.http.put<any>(`${this.apiUrl}/${Module}/${id}`, data);
  }

  deleteItem(Module: string, id: number, Accion: string = ''): Observable<any> {
    let AccionValor = Accion != '' ? `/${Accion}` : '';
    return this.http.delete<any>(`${this.apiUrl}/${Module}${AccionValor}/${id}`);
  }
}

