import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { SoComponent } from './so/so.component';
import { DispositivoComponent } from './dispositivo/dispositivo.component';
import { WearableComponent } from './wearable/wearable.component';
const routes: Routes = [
  { path: "inicio", component: InicioComponent },
  { path: "so", component: SoComponent },
  { path: "dispositivo", component: DispositivoComponent },
  { path: "wearable", component: WearableComponent },
  { path: "**", redirectTo: "inicio" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
