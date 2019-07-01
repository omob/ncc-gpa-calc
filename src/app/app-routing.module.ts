import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanLoad } from '@angular/router';
import { SetupGuard } from './pages/authguard/setup.guard';
import { AuthGuard } from './pages/authguard/authguard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'welcomescreen', pathMatch: 'full' },
  {
    path: 'welcomescreen',
    loadChildren: './pages/welcome-screen/welcome-screen.module#WelcomeScreenPageModule',
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule',
  },
  {
    path: 'setup',
    loadChildren: './pages/setup/setup.module#SetupPageModule',
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule',
    canLoad: [SetupGuard],
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [
  RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
