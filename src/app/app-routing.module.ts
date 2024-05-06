import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { HardwareComponent } from './tickets/hardware/hardware.component';
import { SoftwareComponent } from './tickets/software/software.component';
import { ContactComponent } from './contact/contact.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'home', component: HomeComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'tickets/hardware', component: HardwareComponent },
  { path: 'tickets/software', component: SoftwareComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'admin', component: AdminComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
