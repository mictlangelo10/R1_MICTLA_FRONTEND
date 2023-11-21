import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/User';

@Component({
  selector: 'app-ver-estudiante',
  templateUrl: './ver-estudiante.component.html',
  styleUrls: ['./ver-estudiante.component.css'],
})
export class VerEstudianteComponent implements OnInit {
  listUsers: User[] = [
    { id: 1, nombre: 'Emmanuel', ApellidoP: 'Gutiérrez', ApellidoM: 'Díaz' },
    { id: 2, nombre: 'Miguel', ApellidoP: 'Hernandez', ApellidoM: 'Solis' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
