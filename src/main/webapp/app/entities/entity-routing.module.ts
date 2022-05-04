import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'espace-vert',
        data: { pageTitle: 'angularPfaApp.espaceVert.home.title' },
        loadChildren: () => import('./espace-vert/espace-vert.module').then(m => m.EspaceVertModule),
      },
      {
        path: 'zone',
        data: { pageTitle: 'angularPfaApp.zone.home.title' },
        loadChildren: () => import('./zone/zone.module').then(m => m.ZoneModule),
      },
      {
        path: 'type-sol',
        data: { pageTitle: 'angularPfaApp.typeSol.home.title' },
        loadChildren: () => import('./type-sol/type-sol.module').then(m => m.TypeSolModule),
      },
      {
        path: 'plante',
        data: { pageTitle: 'angularPfaApp.plante.home.title' },
        loadChildren: () => import('./plante/plante.module').then(m => m.PlanteModule),
      },
      {
        path: 'utilisateur',
        data: { pageTitle: 'angularPfaApp.utilisateur.home.title' },
        loadChildren: () => import('./utilisateur/utilisateur.module').then(m => m.UtilisateurModule),
      },
      {
        path: 'capteur',
        data: { pageTitle: 'angularPfaApp.capteur.home.title' },
        loadChildren: () => import('./capteur/capteur.module').then(m => m.CapteurModule),
      },
      {
        path: 'boitier',
        data: { pageTitle: 'angularPfaApp.boitier.home.title' },
        loadChildren: () => import('./boitier/boitier.module').then(m => m.BoitierModule),
      },
      {
        path: 'grandeur',
        data: { pageTitle: 'angularPfaApp.grandeur.home.title' },
        loadChildren: () => import('./grandeur/grandeur.module').then(m => m.GrandeurModule),
      },
      {
        path: 'type-plante',
        data: { pageTitle: 'angularPfaApp.typePlante.home.title' },
        loadChildren: () => import('./type-plante/type-plante.module').then(m => m.TypePlanteModule),
      },
      {
        path: 'plantation',
        data: { pageTitle: 'angularPfaApp.plantation.home.title' },
        loadChildren: () => import('./plantation/plantation.module').then(m => m.PlantationModule),
      },
      {
        path: 'arrosage',
        data: { pageTitle: 'angularPfaApp.arrosage.home.title' },
        loadChildren: () => import('./arrosage/arrosage.module').then(m => m.ArrosageModule),
      },
      {
        path: 'connecte',
        data: { pageTitle: 'angularPfaApp.connecte.home.title' },
        loadChildren: () => import('./connecte/connecte.module').then(m => m.ConnecteModule),
      },
      {
        path: 'installation',
        data: { pageTitle: 'angularPfaApp.installation.home.title' },
        loadChildren: () => import('./installation/installation.module').then(m => m.InstallationModule),
      },
      {
        path: 'extra-user',
        data: { pageTitle: 'angularPfaApp.extraUser.home.title' },
        loadChildren: () => import('./extra-user/extra-user.module').then(m => m.ExtraUserModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
