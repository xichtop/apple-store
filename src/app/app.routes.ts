import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'store',
    pathMatch: 'full'
  },
  {
    path: 'store',
    loadComponent: () => import('./modules/store/store.component').then(m => m.StoreComponent)
  }
];
