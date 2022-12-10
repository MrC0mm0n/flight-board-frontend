import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArrivalComponent } from './features/arrival/arrival.component';
import { DepartureComponent } from './features/departure/departure.component';

const routes: Routes = [
  {path: '', component: ArrivalComponent},
  {path: 'arrivals', component: ArrivalComponent},
  {path: 'departures', component: DepartureComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
