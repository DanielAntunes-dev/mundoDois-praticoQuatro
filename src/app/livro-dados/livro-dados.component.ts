import { Component, OnInit } from '@angular/core';
import { ControleEditoraService } from '../controle-editora.service';
import { Livro } from '../livro';
import { ControleLivrosService } from '../controle-livros.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-livro-dados',
  templateUrl: './livro-dados.component.html',
  styleUrls: ['./livro-dados.component.css']
})
export class LivroDadosComponent implements OnInit {
  opcoes: { value: number; text: string }[] = [];
  titulo: string = '';
  resumo: string = '';
  autores: string = '';
  codEditora: number = 0;

  constructor(
    private servEditora: ControleEditoraService,
    private servLivros: ControleLivrosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.opcoes = this.servEditora.getEditoras().map(editora => ({
      value: editora.codEditora,
      text: editora.nome
    }));
  }

  tratarCombo(event: any): void {
    this.codEditora = parseInt(event.target.value, 10);
  }

  async incluir(event: any): Promise<void> {
    event.preventDefault();
    const autoresArray = this.autores.split('\n').map(autor => autor.trim());

    const novoLivro: Livro = {
      codigo: 0,
      codEditora: this.codEditora,
      titulo: this.titulo,
      resumo: this.resumo,
      autores: autoresArray
    };

    try {
      await this.servLivros.incluir(novoLivro);
      this.router.navigate(['/lista']);
    } catch (error) {
      console.error('Erro ao incluir livro:', error);
    }
  }
}
