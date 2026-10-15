import { Component, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Filme } from '../filme';

export type { Filme } from '../filme';

@Component({
  selector: 'app-card-filme',
  imports: [RouterLink],
  templateUrl: './card-filme.html',
  styleUrl: './card-filme.css'
})
export class CardFilme {
  filme = input.required<Filme>();
  naLista = input(false);
  alternar = output<number>();
  imagemOk = signal(true);
}
