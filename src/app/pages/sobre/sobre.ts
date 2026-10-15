import { Component } from '@angular/core';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.html',
  styleUrl: './sobre.css'
})
export class Sobre {
  ano = new Date().getFullYear();
  conceitos = [
    'Componentes standalone reutilizáveis (CardFilme) e páginas por rota',
    'Rotas com parâmetro (/filme/:id) e query params para as sessões',
    'Serviço com signals e Minha lista salva no navegador (localStorage)',
    'Mapa de assentos interativo com signal e computed'
  ];
}
