import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// ❌ Remover: import { HttpClientModule } from '@angular/common/http';
import { Contato, ContatoService } from './services/contato';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Remover HttpClientModule
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  title = 'Agenda Telefônica'; // Adicionar esta linha
  contatos: Contato[] = [];
  contatosFiltrados: Contato[] = [];
  contato: Contato = { nome: '', telefone: '' };
  showForm = false;
  editingContato = false;
  filtro = '';

  constructor(private contatoService: ContatoService) {}

  ngOnInit() {
    this.carregarContatos();
  }

  carregarContatos() {
    this.contatoService.getContatos().subscribe({
      next: (contatos) => {
        this.contatos = contatos;
        this.filtrarContatos();
      },
      error: (error) => console.error('Erro ao carregar contatos:', error)
    });
  }

  salvarContato() {
    if (this.editingContato && this.contato.id) {
      this.contatoService.updateContato(this.contato.id, this.contato).subscribe({
        next: () => {
          this.carregarContatos();
          this.resetForm();
        },
        error: (error) => console.error('Erro ao atualizar contato:', error)
      });
    } else {
      this.contatoService.createContato(this.contato).subscribe({
        next: () => {
          this.carregarContatos();
          this.resetForm();
        },
        error: (error) => console.error('Erro ao criar contato:', error)
      });
    }
  }

  editarContato(contato: Contato) {
    this.contato = { ...contato };
    this.editingContato = true;
    this.showForm = true;
  }

  excluirContato(id: number) {
    if (confirm('Tem certeza que deseja excluir este contato?')) {
      this.contatoService.deleteContato(id).subscribe({
        next: () => this.carregarContatos(),
        error: (error) => console.error('Erro ao excluir contato:', error)
      });
    }
  }

  filtrarContatos() {
    if (!this.filtro) {
      this.contatosFiltrados = [...this.contatos];
    } else {
      const filtroLower = this.filtro.toLowerCase();
      this.contatosFiltrados = this.contatos.filter(contato =>
        contato.nome.toLowerCase().includes(filtroLower) ||
        contato.telefone.includes(filtroLower) ||
        (contato.email && contato.email.toLowerCase().includes(filtroLower))
      );
    }
  }

  resetForm() {
    this.contato = { nome: '', telefone: '' };
    this.editingContato = false;
    this.showForm = false;
  }

  cancelarEdicao() {
    this.resetForm();
  }
}
