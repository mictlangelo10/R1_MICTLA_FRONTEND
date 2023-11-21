// interfaces/User.ts
export interface User {
  id_registro_estudiante?: number; // Puedes hacer que este campo sea opcional si es posible que no esté presente en algunos casos
  id_ciudad: number;
  id_bachillerato: number;
  id_especialidad: number;
  id_carrera: number;
  nombre_estudiante: string;
  apellido_paterno_estudiante: string;
  apellido_materno_estudiante: string;
  calle: string;
  numero: number;
  colonia: string;
  codigo_postal: number;
  telefono_casa: number;
  telefono_estudiante: number;
  telefono_tutor: number;
  promedio_bachillerato: number;
  nombre_madre: string;
  apellido_paterno_madre: string;
  apellido_materno_madre: string;
  nombre_padre: string;
  apellido_paterno_padre: string;
  apellido_materno_padre: string;
  fecha_registro: string; // Ajusta el tipo según cómo se devuelva la fecha desde el backend
  foto_estudiante: string;
  certificado_bachillerato: string;
  comprobante_domicilio: string;
  correo_estudiante: string;
  matricula_estudiante: string;
}
