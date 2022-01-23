import { Injectable } from '@angular/core';
import { Estudiante } from '../models/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  listEstudiante: Estudiante[] = [
    {
      nombre: 'Carlyle Komalram',
      telefono: 63932331,
      correo: 'glaw14@gmail.com',
      fechaIngreso: new Date(),
      estadoCivil: 'Soltero',
      sexo: 'Masculino'
    },
    {
      nombre: 'Bhagwan Komalram',
      telefono: 63932331,
      correo: 'bagui2@gmail.com',
      fechaIngreso: new Date(),
      estadoCivil: 'Soltero',
      sexo: 'Masculino'
    },
    {
      nombre: 'Melanie Komalram',
      telefono: 63932331,
      correo: 'mela22@gmail.com',
      fechaIngreso: new Date(),
      estadoCivil: 'Soltero',
      sexo: 'Femenino'
    },
    {
      nombre: 'Yoainaris Concepción',
      telefono: 63932331,
      correo: 'yoa123@gmail.com',
      fechaIngreso: new Date(),
      estadoCivil: 'Soltero',
      sexo: 'Femenino'
    },
    {
      nombre: 'Bella Sofia',
      telefono: 63932331,
      correo: 'bella123@gmail.com',
      fechaIngreso: new Date(),
      estadoCivil: 'Soltero',
      sexo: 'Femenino'
    },
  ];

  constructor() { }

  getEstudiante(){
    return this.listEstudiante.slice();
  }

  eliminarEstudiante(index:number){
    this.listEstudiante.splice(index,1);
  }

  agregarEstudiante(estudiante: Estudiante){
    this.listEstudiante.push(estudiante);

    // this.listEstudiante.unshift(estudiante); PAra insertar de primero.
  }

  obtenerEstudiante(index: number){
    return this.listEstudiante[index];
  }

  editarEstudiante(estudiante: Estudiante, index: number){
      this.listEstudiante[index].nombre = estudiante.nombre;
      this.listEstudiante[index].correo = estudiante.correo;
      this.listEstudiante[index].fechaIngreso = estudiante.fechaIngreso;
      this.listEstudiante[index].estadoCivil = estudiante.estadoCivil;
      this.listEstudiante[index].sexo = estudiante.sexo;
      this.listEstudiante[index].telefono = estudiante.telefono;
  }
}
