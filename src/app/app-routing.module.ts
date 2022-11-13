import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'monitoring',
    pathMatch: 'full'
  },
  {
    path: 'monitoring',
    loadChildren: () => import('./monitoring/monitoring.module').then( m => m.MonitoringPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cultivos',
    loadChildren: () => import('./cultivos/cultivos.module').then( m => m.CultivosPageModule)
  },
  {
    path: 'reportes',
    loadChildren: () => import('./reportes/reportes.module').then( m => m.ReportesPageModule)
  },
  {
    path: 'ciclos',
    loadChildren: () => import('./ciclos/ciclos.module').then( m => m.CiclosPageModule)
  },
  {
    path: 'invernaderos',
    loadChildren: () => import('./invernaderos/invernaderos.module').then( m => m.InvernaderosPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
