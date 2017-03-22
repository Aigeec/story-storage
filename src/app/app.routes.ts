import { LoggedInGuard } from './guards/logged-in.guard'

import { LandingComponent } from './components/landing/landing.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [LoggedInGuard] }
];
