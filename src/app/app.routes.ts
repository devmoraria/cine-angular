import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Detalhe } from './pages/detalhe/detalhe';
import { Assentos } from './pages/assentos/assentos';
import { Sobre } from './pages/sobre/sobre';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'filme/:id', component: Detalhe },
  { path: 'filme/:id/assentos', component: Assentos },
  { path: 'sobre', component: Sobre },
  { path: '**', redirectTo: '' }
];
