import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstudianteComponent } from './components/estudiante/estudiante.component';
import { VerEstudianteComponent } from './components/ver-estudiante/ver-estudiante.component';

const routes: Routes = [
  { path: '', component: EstudianteComponent },
  { path: 'ver', component: VerEstudianteComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
