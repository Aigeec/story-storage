import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { routes } from './app.routes';

import { LocalStorageModule } from 'angular-2-local-storage';

import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { AppComponent } from './components/app/app.component';
import { LandingComponent } from './components/landing/landing.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ProfileComponent } from './components/profile/profile.component';

import { UserService } from './services/user/user.service';
import { LoggedInGuard } from './guards/logged-in.guard';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SignUpComponent,
    SignInComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    ToastModule.forRoot(),
    LocalStorageModule.withConfig({
      prefix: 'story-storage',
      storageType: 'sessionStorage'
    })
  ],
  providers: [UserService, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
