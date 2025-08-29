import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contato } from '../models/contato.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private apiUrl = `${environment.apiUrl}/api/contatos`;

  constructor(private http: HttpClient) { }

  getContatos(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.apiUrl);
  }

  getContato(id: number): Observable<Contato> {
    return this.http.get<Contato>(`${this.apiUrl}/${id}`);
  }

  createContato(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.apiUrl, contato);
  }

  updateContato(contato: Contato): Observable<any> {
    return this.http.put(`${this.apiUrl}/${contato.id}`, contato);
  }

  deleteContato(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}