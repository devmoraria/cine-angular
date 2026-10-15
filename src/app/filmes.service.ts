import { Injectable, effect, signal } from '@angular/core';
import { Filme } from './filme';

const CHAVE = 'cine-angular:lista';

@Injectable({ providedIn: 'root' })
export class FilmesService {
  readonly filmes: Filme[] = [
    { id: 1, titulo: 'Street Fighter', genero: 'Ação', estreia: '15/10/2026', status: 'cartaz', poster: 'posters/street-fighter.jpg',
      cor: '#7a1f1f', sinopse: 'Lutadores de todo o mundo se encontram em um torneio inspirado na clássica franquia de games.' },
    { id: 2, titulo: 'Jogos Vorazes: Em Chamas', genero: 'Ficção científica', estreia: '15/10/2026 (relançamento)', status: 'cartaz', poster: 'posters/jogos-vorazes-em-chamas.jpg',
      cor: '#4a1b0c', sinopse: 'Katniss volta à arena em uma edição especial dos Jogos, enquanto a revolta se espalha pelos distritos.' },
    { id: 3, titulo: 'Dentro da Baleia', genero: 'Suspense', estreia: '15/10/2026', status: 'cartaz', poster: 'posters/dentro-da-baleia.jpg',
      cor: '#0b2a4a', sinopse: 'Um suspense em alto-mar com um encontro inesperado nas profundezas do oceano.' },
    { id: 4, titulo: 'Galinha Pintadinha - O Filme', genero: 'Animação', estreia: '01/10/2026', status: 'cartaz', poster: 'posters/galinha-pintadinha.jpg',
      cor: '#1d6fb8', sinopse: 'A turma mais querida da criançada ganha uma aventura nos cinemas, cheia de música e cor.' },
    { id: 5, titulo: 'Jogos Vorazes: Amanhecer na Colheita', genero: 'Ficção científica', estreia: '19/11/2026', status: 'breve', poster: 'posters/amanhecer-na-colheita.jpg',
      cor: '#2b2b2b', sinopse: 'Uma nova história no universo de Panem, mostrando como os Jogos eram em outra época.' },
    { id: 6, titulo: 'Nárnia: O Sobrinho do Mago', genero: 'Fantasia', estreia: 'Novembro de 2026', status: 'breve', poster: 'posters/narnia.jpg',
      cor: '#123a5c', sinopse: 'A origem de Nárnia: como o mundo mágico nasceu e quem abriu a porta para ele.' },
    { id: 7, titulo: 'Duna: Parte Três', genero: 'Ficção científica', estreia: '17/12/2026', status: 'breve', poster: 'posters/duna-parte-tres.jpg',
      cor: '#5a3510', sinopse: 'A conclusão épica da saga em Arrakis.' },
    { id: 8, titulo: 'Vingadores: Doomsday', genero: 'Super-herói', estreia: 'Dezembro de 2026', status: 'breve', poster: 'posters/vingadores-doomsday.jpg',
      cor: '#0d1b3d', sinopse: 'Os heróis enfrentam uma ameaça sem precedentes liderada por Doutor Destino.' }
  ];

  // Minha lista: fica salva no navegador (localStorage)
  readonly lista = signal<number[]>(this.carregar());

  constructor() {
    effect(() => {
      try { localStorage.setItem(CHAVE, JSON.stringify(this.lista())); } catch { /* sem storage */ }
    });
  }

  private carregar(): number[] {
    try { return JSON.parse(localStorage.getItem(CHAVE) ?? '[]'); } catch { return []; }
  }

  porId(id: number): Filme | undefined { return this.filmes.find(f => f.id === id); }
  naLista(id: number): boolean { return this.lista().includes(id); }
  alternar(id: number): void {
    this.lista.update(l => l.includes(id) ? l.filter(i => i !== id) : [...l, id]);
  }
}
