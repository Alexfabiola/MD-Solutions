import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { CreateUserComponent } from './components/user/create/create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './components/user/list/user-list.component';
import { MovieComponent } from './components/movie/movie.component';
import { CreateMovieComponent } from './components/movie/create/create-movie.component';
import { MovieListComponent } from './components/movie/list/movie-list.component';
import { AssignmentComponent } from './components/assignment/assignment.component';
import { CreateAssignmentComponent } from './components/assignment/create/create-assignment.component';
import { AssignmentListComponent } from './components/assignment/list/assignment-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    DashboardComponent,
    UserComponent,
    CreateUserComponent,
    UserListComponent,
    MovieComponent,
    CreateMovieComponent,
    MovieListComponent,
    AssignmentComponent,
    CreateAssignmentComponent,
    AssignmentListComponent,
  ],
  entryComponents: [
    UserComponent,
    CreateUserComponent,
    UserListComponent,
    MovieComponent,
    CreateMovieComponent,
    MovieListComponent,
    CreateAssignmentComponent,
    AssignmentListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
