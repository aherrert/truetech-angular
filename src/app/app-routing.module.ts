import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { HardwareComponent } from './tickets/hardware/hardware.component';
import { SoftwareComponent } from './tickets/software/software.component';
import { HardwareWorkerComponent } from './tickets/hardware-worker/hardware-worker.component';
import { SoftwareWorkerComponent } from './tickets/software-worker/software-worker.component';
import { ContactComponent } from './contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { EnviarcorreoComponent } from './enviarcorreo/enviarcorreo.component';


const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'home', component: HomeComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'edit/password', component: EditPasswordComponent},
  { path: 'tickets/hardware', component: HardwareComponent },
  { path: 'tickets/software', component: SoftwareComponent },
  { path: 'tickets/hardware-worker', component: HardwareWorkerComponent },
  { path: 'tickets/software-worker', component: SoftwareWorkerComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'admin', component: AdminComponent},
  { path: 'resetpassword', component: ResetpasswordComponent },
  { path: 'enviarcorreo', component: EnviarcorreoComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
