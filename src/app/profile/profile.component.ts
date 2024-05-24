import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  nombre: string | null = '';
  apellidos: string | null = '';
  email: string | null = '';
  editandoNombre: boolean = false;
  editandoApellidos: boolean = false;

  constructor(private conexHttp: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Obtener la información del usuario del localStorage
    this.nombre = localStorage.getItem('nombre');
    this.apellidos = localStorage.getItem('apellidos');
    this.email = localStorage.getItem('email');
  }

  toggleEdit(campo: string) {
    if (campo === 'nombre') {
      this.editandoNombre = !this.editandoNombre;
    } else if (campo === 'apellidos') {
      this.editandoApellidos = !this.editandoApellidos;
    }
  }

  guardarCambios() {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error("Token no encontrado en el localStorage");
      alert("¡Para editar el perfil primero debes de inciar sesión!");
      this.router.navigate(['/login']);
      return;
    }
  
    const formulario_data = {
      nombre: this.nombre,
      apellidos: this.apellidos,
      email: this.email,
      token: token
    };
  
    this.conexHttp.post('/usuario/editarPerfil', formulario_data).subscribe(
      (respuesta: any) => {
        console.log("Editar Perfil", respuesta);
        if (respuesta.status === 'OK') {
          alert("¡Perfil editado correctamente!");
          window.location.reload();
          // Actualizar el localStorage con el nuevo nombre y apellidos
          
          localStorage.setItem('nombre', this.nombre ?? '');
          localStorage.setItem('nombreUsuario', this.nombre ?? ''); // Aquí se almacena el nombre de usuario
          localStorage.setItem('apellidos', this.apellidos ?? '');
        }
      },
      (error) => {
        console.error("Editar Perfil", error);
        if (error.status === 401) {
          alert("¡El token es inválido! Por favor, inicia sesión nuevamente.");
          this.router.navigate(['/login']);
        } else {
          alert("Error de usuario no encontrado o que los datos no son válidos");
        }
      }
    );
  }  
}
