import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireModule} from "@angular/fire";
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from "../environments/environment.prod";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CoreModule} from "./core/core.module";
import {AuthService} from "./core/shared/auth.service";
import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule
} from "@angular/material";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    MatToolbarModule,
    MatSelectModule,
    MatInputModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
