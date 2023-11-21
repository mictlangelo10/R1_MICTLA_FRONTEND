import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegistrosService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  // Obtener todas las ciudades
  getCiudades(): Observable<any> {
    return this.http.get(`${this.apiUrl}/ciudades`);
  }

  // Obtener todas las carreras
  getCarreras(): Observable<any> {
    return this.http.get(`${this.apiUrl}/carreras`);
  }

  // Obtener todos los bachilleratos
  getBachilleratos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/bachilleratos`);
  }

  // Obtener todas las especialidades
  getEspecialidades(): Observable<any> {
    return this.http.get(`${this.apiUrl}/especialidades`);
  }

  // Crear un nuevo registro de estudiante
  createRegistroEstudiante(registroData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registroEstudiante`, registroData);
  }

  // Obtener todos los registros de estudiantes
  getRegistrosEstudiantes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/registros`);
  }

  // Obtener un registro de estudiante por ID
  getRegistroEstudianteById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/registroEstudiante/${id}`);
  }
}
