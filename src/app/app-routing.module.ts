import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainhomeComponent } from './components/mainhome/mainhome.component';

const routes: Routes = [
  {path:"", component:MainhomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
