import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Modelo Contato
export interface Contato {
  id?: number;
  nome: string;
  telefone: string;
  email?: string;
  endereco?: string;
  dataCriacao?: Date;
}

// Serviço para operações CRUD
@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private apiUrl = 'http://localhost:5000/api/contatos';

  constructor(private http: HttpClient) { }

  // Listar todos os contatos
  getContatos(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.apiUrl);
  }

  // Buscar contato por ID
  getContato(id: number): Observable<Contato> {
    return this.http.get<Contato>(`${this.apiUrl}/${id}`);
  }

  // Criar novo contato
  createContato(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.apiUrl, contato);
  }

  // Atualizar contato
  updateContato(id: number, contato: Contato): Observable<Contato> {
    return this.http.put<Contato>(`${this.apiUrl}/${id}`, contato);
  }

  // Deletar contato
  deleteContato(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
