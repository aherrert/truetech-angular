import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { SoftwareComponent } from './tickets/software/software.component';
import { HardwareComponent } from './tickets/hardware/hardware.component';
import { Header2Component } from './header2/header2.component';
import { ContactComponent } from './contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { HardwareWorkerComponent } from './tickets/hardware-worker/hardware-worker.component';
import { SoftwareWorkerComponent } from './tickets/software-worker/software-worker.component';
import { EnviarcorreoComponent } from './enviarcorreo/enviarcorreo.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    ProfileComponent,
    SoftwareComponent,
    HardwareComponent,
    Header2Component,
    ContactComponent,
    AdminComponent,
    HardwareWorkerComponent,
    SoftwareWorkerComponent,
    EnviarcorreoComponent,
    ResetpasswordComponent,
    ChatbotComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule // Agrega FormsModule aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
