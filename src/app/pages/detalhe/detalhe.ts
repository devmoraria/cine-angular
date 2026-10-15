import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { FilmesService } from '../../filmes.service';

const pad = (n: number) => String(n).padStart(2, '0');

@Component({
  selector: 'app-detalhe',
  imports: [RouterLink],
  templateUrl: './detalhe.html',
  styleUrl: './detalhe.css'
})
export class Detalhe {
  svc = inject(FilmesService);
  private id = toSignal(inject(ActivatedRoute).paramMap.pipe(map(p => Number(p.get('id')))));
  filme = computed(() => this.svc.porId(this.id() ?? 0));

  // Sessões de demonstração (cinemas fictícios)
  cinemas = ['Cine Angular Centro', 'Cine Angular Shopping'];
  sessoes = [
    { hora: '14:00', formato: '2D Dublado' }, { hora: '16:30', formato: '2D Legendado' },
    { hora: '19:00', formato: '3D Dublado' }, { hora: '21:30', formato: 'VIP Legendado' }
  ];
  dias = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i);
    const rotulo = `${pad(d.getDate())}/${pad(d.getMonth() + 1)}`;
    return { valor: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`, rotulo: i === 0 ? `Hoje · ${rotulo}` : rotulo };
  });
  cinema = signal(this.cinemas[0]);
  dia = signal(this.dias[0].valor);
}
