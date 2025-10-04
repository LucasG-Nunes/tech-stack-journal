import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./presentation/home/home.routes').then(({ routes }) => routes),
  },
  {
    path: 'blog',
    loadChildren: () => import('./presentation/blog/blog.routes').then(({ routes }) => routes),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
