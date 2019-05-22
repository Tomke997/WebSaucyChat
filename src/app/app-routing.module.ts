import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "./core/shared/auth.guard";

const routes: Routes = [
  {
    path: 'message-room',
    loadChildren: './message-room/message-room.module#MessageRoomModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: './user/user.module#UserModule'
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
