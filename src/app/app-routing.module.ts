import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PlayerComponent } from "./pages/player/player.component";
import {HomeComponent} from "./pages/home/home.component";
import {PlayerResolver} from "./resolvers/player-resolver";
import {PlayerGuard} from "./guards/player-guard";

const routes: Routes = [
  {
    path: "player",
    component: PlayerComponent,
    resolve: { currentFile: PlayerResolver },
    canActivate: [PlayerGuard]
  },
  {
    path: 'Liste-de-chansons',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'Liste-de-chansons'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
