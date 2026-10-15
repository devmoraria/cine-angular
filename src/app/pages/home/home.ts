import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardFilme } from '../../card-filme/card-filme';
import { FilmesService } from '../../filmes.service';

type Aba = 'cartaz' | 'breve' | 'lista';

@Component({
  selector: 'app-home',
  imports: [FormsModule, RouterLink, CardFilme],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  svc = inject(FilmesService);
  abas: { id: Aba; nome: string }[] = [
    { id: 'cartaz', nome: 'Em cartaz' }, { id: 'breve', nome: 'Em breve' }, { id: 'lista', nome: 'Minha lista' }
  ];
  aba = signal<Aba>('cartaz');
  busca = signal('');

  destaques = this.svc.filmes.slice(0, 4);
  slide = signal(0);
  atual = computed(() => this.destaques[this.slide()]);

  filtrados = computed(() => {
    const termo = this.busca().toLowerCase().trim();
    const aba = this.aba();
    return this.svc.filmes.filter(f =>
      f.titulo.toLowerCase().includes(termo) &&
      (aba === 'lista' ? this.svc.naLista(f.id) : f.status === aba)
    );
  });

  constructor() {
    const t = setInterval(() => this.slide.update(i => (i + 1) % this.destaques.length), 5000);
    inject(DestroyRef).onDestroy(() => clearInterval(t));
  }
}
