import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'message-room',
    loadChildren: './message-room/message-room.module#MessageRoomModule'
  },
  {
    path: 'stuff',
    loadChildren: './shared/shared.module#SharedModule'
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
