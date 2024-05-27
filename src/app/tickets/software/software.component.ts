import { Component, OnInit } from '@angular/core';
import { PetitionService } from '../../petition.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.css']
})
export class SoftwareComponent implements OnInit {
  mostrarFormulario: boolean = false;
  formulario_data: any;
  incidenciaEnviada: boolean = false;
  incidencias: any[] = []; // Variable para almacenar las incidencias
  email: string | null = ''; // Variable para almacenar el correo del usuario
  errorMessage: string = ''; // Variable para almacenar el mensaje de error
  imgCargar = { cargarsvg: false }; // Definición de la propiedad imgCargar


  constructor(private enviarIncidenciaService: PetitionService, private router: Router, private conexHttp: HttpClient, private http: HttpClient) {
    this.formulario_data = {
      email: '',
      asunto_reparacion: '',
      mensaje_reparacion: '',
      imagen: null // Agrega la variable para almacenar la imagen seleccionada
    };
  }

  activarCarga() {
    this.imgCargar.cargarsvg = true; // Activar la carga
  }
  
  ngOnInit(): void {
    this.email = localStorage.getItem('email');

    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    // Verificar si el token está presente
    if (token) {
      // Llamar al servicio para obtener las incidencias pasando el token
      this.obtenerIncidencias(token);
    } else {
      console.error('No se encontró el token en el localStorage');
    }
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.incidenciaEnviada = false;
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file: File = inputElement.files[0];
      // Verificar el tamaño del archivo
      if (file.size > 500000) { // 500 KB en bytes
        alert('La imagen es demasiado grande. Por favor, seleccione una imagen más pequeña de 500KB.');
        // Limpiar el campo de archivo seleccionado
        inputElement.value = '';
        return; // Salir de la función sin asignar la imagen al formulario
      }
      // Asignar el archivo al formulario_data
      this.formulario_data.imagen = file;
    }
  }

  enviarIncidencia() {
    if (!this.formulario_data.imagen) {
      alert('Por favor, seleccione una imagen.');
      return; // Salir de la función si no hay una imagen seleccionada
    }
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("Token no encontrado en el localStorage");
      alert("¡Para enviar una incidencia debes iniciar sesión!");
      this.router.navigate(['/login']);
      return;
    }

    const formData = new FormData();
    formData.append('email', this.email || '');
    formData.append('asunto_reparacion', this.formulario_data.asunto_reparacion);
    formData.append('mensaje_reparacion', this.formulario_data.mensaje_reparacion);
    formData.append('imagen', this.formulario_data.imagen);
    formData.append('token', token);
    formData.append('id_cargo', '2');

    this.http.post('incidencia/registrar', formData).subscribe(
      (respuesta: any) => {
        if (respuesta.status === 'OK') {
          console.log("Incidencia", respuesta);
          console.log("¡Incidencia creada exitosamente!");
          window.location.reload();
        } else {
          alert("Ocurrió un error al intentar registrar. Por favor, inténtalo de nuevo más tarde.");
        }
        this.imgCargar.cargarsvg = false; // Desactivar la carga después de recibir la respuesta
      },
      (error) => {
        console.error("Registro", error);
        let errorMessage = "Error al enviar la incidencia";

        if (error.status === 401) {
          errorMessage = "Acceso no autorizado. Por favor, inicia sesión.";
        } else if (error.status === 403) {
          errorMessage = "El token ha expirado o es inválido.";
          this.router.navigate(['/login']);
        } else {
          errorMessage = "Ocurrió un error en el servidor. Por favor, inténtalo de nuevo más tarde.";
        }

        alert(errorMessage);
        this.imgCargar.cargarsvg = false; // Desactivar la carga después de recibir la respuesta
      }
    );
  }


  obtenerIncidencias(token: string) {
    // Realizar la solicitud HTTP para obtener las incidencias del cliente
    this.enviarIncidenciaService.obtenerIncidenciasCliente(token).subscribe(
      (respuesta: any) => {
        console.log("Incidencias", respuesta);
        // Almacenar las incidencias en la variable
        this.incidencias = respuesta["incidencias"];

        // Para cada incidencia, puedes modificar la URL de la imagen para que solo contenga la ruta relativa
        this.incidencias.forEach((incidencia: any) => {
          // Eliminar la parte del dominio de la URL de la imagen y dejar solo la ruta relativa
          const rutaRelativa = incidencia.imagen.substring(incidencia.imagen.indexOf('/images'));
          // Asignar la nueva URL a la propiedad imagen
          incidencia.imagen = 'http://127.0.0.1:8000/' + rutaRelativa;
        });
      },
      (error) => {
        console.error("Error al obtener incidencias", error);
      }
    );
  }
}
