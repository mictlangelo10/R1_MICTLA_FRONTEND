// ver-estudiante.component.ts
import { Component, OnInit } from '@angular/core';
import { RegistrosService } from 'src/app/service/registros.service';
import { User } from 'src/app/interfaces/User';

@Component({
  selector: 'app-ver-estudiante',
  templateUrl: './ver-estudiante.component.html',
  styleUrls: ['./ver-estudiante.component.css'],
})
export class VerEstudianteComponent implements OnInit {
  listUsers: User[] = [];
  estudiante: any;

  constructor(private registrosService: RegistrosService) {}

  ngOnInit(): void {
    this.registrosService.getRegistrosEstudiantes().subscribe(
      (registros) => {
        this.listUsers = registros;
      },
      (error) => {
        console.error('Error al obtener registros de estudiantes:', error);
      }
    );
  }

  verDetalle(id: number | undefined): void {
    console.log('Ver detalle para el ID:', id);

    if (id !== undefined) {
      this.registrosService.getRegistroEstudianteById(id).subscribe(
        (estudiante) => {
          this.estudiante = estudiante;
          console.log('Estudiante detallado:', this.estudiante);

          // Abrir una nueva ventana para mostrar los detalles
          const nuevaVentana = window.open('', '_blank');
          if (nuevaVentana) {
            // Agregar referencias a las hojas de estilos
            nuevaVentana.document.write('<!DOCTYPE html>');
            nuevaVentana.document.write('<html lang="en">');
            nuevaVentana.document.write('<head>');
            nuevaVentana.document.write('<meta charset="utf-8" />');
            nuevaVentana.document.write('<title>Torres</title>');
            nuevaVentana.document.write('<base href="/" />');
            nuevaVentana.document.write('<meta name="viewport" content="width=device-width, initial-scale=1" />');
            nuevaVentana.document.write('<link rel="icon" type="image/x-icon" href="favicon.ico" />');
            nuevaVentana.document.write('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.2.1/quartz/bootstrap.min.css" integrity="sha512-MtIFp1X1XW20+oDP5Px0yyJ2QuTXsiHqNQnNdC/haBRqVePWs1x7wn5YXpQ6+WWT5sqVawAw43r9hqnjcZ5XZw==" crossorigin="anonymous" referrerpolicy="no-referrer" />');
            nuevaVentana.document.write('<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet" />');
            nuevaVentana.document.write('<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />');
            nuevaVentana.document.write('</head>');
            nuevaVentana.document.write('<body class="mat-typography" style="display: flex; justify-content: center; height: 100vh;">');
            
            // Contenido HTML específico para la nueva ventana
            nuevaVentana.document.write('<div style="text-align: center; margin-top: 50px;">');  // Ajusta el valor de margin-top según tus necesidades
            nuevaVentana.document.write('<h2>Detalles del Estudiante</h2>');
            nuevaVentana.document.write('<table class="table table-hover table-sm" style="width: 400px;">');  // Ajusta el ancho según tus necesidades
            nuevaVentana.document.write('<thead>');
            nuevaVentana.document.write('<tr>');
            nuevaVentana.document.write('<th scope="col"></th>');
            nuevaVentana.document.write('<th scope="col"></th>');
            nuevaVentana.document.write('</tr>');
            nuevaVentana.document.write('</thead>');
            nuevaVentana.document.write('<tbody>');
            nuevaVentana.document.write(`<tr class="table-active"><td>Nombre</td><td>${estudiante.nombre_estudiante}</td></tr>`);
            nuevaVentana.document.write(`<tr class="table-active"><td>Apellido Paterno</td><td>${estudiante.apellido_paterno_estudiante}</td></tr>`);
            nuevaVentana.document.write(`<tr class="table-active"><td>Apellido Materno</td><td>${estudiante.apellido_materno_estudiante}</td></tr>`);
            nuevaVentana.document.write(`<tr class="table-active"><td>Calle</td><td>${estudiante.calle}</td></tr>`);
            nuevaVentana.document.write(`<tr class="table-active"><td>Número</td><td>${estudiante.numero}</td></tr>`);
            nuevaVentana.document.write(`<tr class="table-active"><td>Colonia</td><td>${estudiante.colonia}</td></tr>`);
            nuevaVentana.document.write(`<tr class="table-active"><td>Código Postal</td><td>${estudiante.codigo_postal}</td></tr>`);
            nuevaVentana.document.write(`<tr class="table-active"><td>Teléfono Casa</td><td>${estudiante.telefono_casa}</td></tr>`);
            nuevaVentana.document.write(`<tr class="table-active"><td>Teléfono Estudiante</td><td>${estudiante.telefono_estudiante}</td></tr>`);
            nuevaVentana.document.write(`<tr class="table-active"><td>Teléfono Tutor</td><td>${estudiante.telefono_tutor}</td></tr>`);
            nuevaVentana.document.write(`<tr class="table-active"><td>Promedio Bachillerato</td><td>${estudiante.promedio_bachillerato}</td></tr>`);
            nuevaVentana.document.write(`<tr class="table-active"><td>Nombre Madre</td><td>${estudiante.nombre_madre}</td></tr>`);
            nuevaVentana.document.write(`<tr class="table-active"><td>Apellido Paterno Madre</td><td>${estudiante.apellido_paterno_madre}</td></tr>`);
            nuevaVentana.document.write(`<tr class="table-active"><td>Apellido Materno Madre</td><td>${estudiante.apellido_materno_madre}</td></tr>`);
            nuevaVentana.document.write(`<tr class="table-active"><td>Nombre Padre</td><td>${estudiante.nombre_padre}</td></tr>`);
            nuevaVentana.document.write(`<tr class="table-active"><td>Apellido Paterno Padre</td><td>${estudiante.apellido_paterno_padre}</td></tr>`);
            nuevaVentana.document.write(`<tr class="table-active"><td>Apellido Materno Padre</td><td>${estudiante.apellido_materno_padre}</td></tr>`);
            nuevaVentana.document.write(`<tr class="table-active"><td>Fecha Registro</td><td>${estudiante.fecha_registro}</td></tr>`);
            nuevaVentana.document.write(`<tr class="table-active"><td>Foto Estudiante</td><td><img src="${estudiante.foto_estudiante}" alt="Foto del Estudiante" style="max-width: 100px; max-height: 100px;" /></td></tr>`);
            nuevaVentana.document.write(`<tr class="table-active"><td>Certificado Bachillerato</td><td><a href="${estudiante.certificado_bachillerato}" target="_blank">Ver Certificado</a></td></tr>`);
            nuevaVentana.document.write(`<tr class="table-active"><td>Comprobante Domicilio</td><td><a href="${estudiante.comprobante_domicilio}" target="_blank">Ver Comprobante</a></td></tr>`);
            nuevaVentana.document.write(`<tr class="table-active"><td>Correo Estudiante</td><td>${estudiante.correo_estudiante}</td></tr>`);
            nuevaVentana.document.write(`<tr class="table-active"><td>Matrícula Estudiante</td><td>${estudiante.matricula_estudiante}</td></tr>`);
            // Agregar más detalles según sea necesario
            nuevaVentana.document.write('</tbody>');
            nuevaVentana.document.write('</table>');
            nuevaVentana.document.write('</div>');

            nuevaVentana.document.write('</body>');
            nuevaVentana.document.write('</html>');
          } else {
            console.error('No se pudo abrir la nueva ventana');
          }
        },
        (error) => {
          console.error('Error al obtener el detalle del estudiante:', error);
        }
      );
    }
  }
}
