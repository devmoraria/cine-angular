export interface Filme {
  id: number;
  titulo: string;
  genero: string;
  estreia: string;
  status: 'cartaz' | 'breve';
  poster: string;
  cor: string;
  sinopse: string; // edite os textos como quiser
}
