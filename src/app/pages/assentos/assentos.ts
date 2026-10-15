import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { FilmesService } from '../../filmes.service';

const MAX = 6;
const PRECO = 32; // valor de demonstração (inteira)

@Component({
  selector: 'app-assentos',
  imports: [RouterLink],
  templateUrl: './assentos.html',
  styleUrl: './assentos.css'
})
export class Assentos {
  svc = inject(FilmesService);
  private rota = inject(ActivatedRoute);
  private id = toSignal(this.rota.paramMap.pipe(map(p => Number(p.get('id')))));
  sessao = toSignal(this.rota.queryParamMap.pipe(map(q => ({
    cinema: q.get('cinema') ?? '', dia: q.get('dia') ?? '', hora: q.get('hora') ?? '', formato: q.get('formato') ?? ''
  }))), { requireSync: true });
  filme = computed(() => this.svc.porId(this.id() ?? 0));

  fileiras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  colunas = Array.from({ length: 10 }, (_, i) => i + 1);
  selecionados = signal<string[]>([]);
  codigo = signal('');

  total = computed(() => this.selecionados().length * PRECO);
  dataBr = computed(() => this.sessao().dia.split('-').reverse().join('/'));

  // Assentos ocupados: sorteio fixo por sessão (mesma sessão = mesmo mapa)
  private semente = computed(() => {
    const s = this.sessao(); let h = 7;
    for (const ch of `${this.id()}${s.cinema}${s.dia}${s.hora}`) h = (Math.imul(h, 31) + ch.charCodeAt(0)) >>> 0;
    return h;
  });
  ocupado(f: string, c: number): boolean {
    const n = this.fileiras.indexOf(f) * 10 + c;
    return (Math.imul(this.semente() ^ n, 2654435761) >>> 0) % 100 < 22;
  }
  estado(f: string, c: number): 'ocupado' | 'selecionado' | 'livre' {
    if (this.ocupado(f, c)) return 'ocupado';
    return this.selecionados().includes(f + c) ? 'selecionado' : 'livre';
  }
  alternar(f: string, c: number): void {
    const id = f + c;
    if (this.estado(f, c) === 'ocupado') return;
    this.selecionados.update(l => l.includes(id) ? l.filter(x => x !== id)
      : l.length < MAX ? [...l, id].sort() : l);
  }
  confirmar(): void {
    this.codigo.set('CA-' + Math.random().toString(36).slice(2, 8).toUpperCase());
  }
  brl(v: number): string { return 'R$ ' + v.toFixed(2).replace('.', ','); }
}
