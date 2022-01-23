import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Estudiante } from 'src/app/models/estudiante';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-add-edit-empleado',
  templateUrl: './add-edit-empleado.component.html',
  styleUrls: ['./add-edit-empleado.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }]
})
export class AddEditEmpleadoComponent implements OnInit {

  estadociviles: any[] = ['Soltero', 'Casado', 'Divorciado'];
  myform: FormGroup;
  idEstudiante: any;
  accion ='Crear';

  constructor(private fb: FormBuilder, private _estudianteServices: EstudianteService
    , private route: Router,public snackbar: MatSnackBar , private activateRoute: ActivatedRoute) {
    this.myform = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      correo: ['', [Validators.required, Validators.email]],
      fechaIngreso: ['', [Validators.required ]],
      telefono: ['', [Validators.required ]],
      estadoCivil: ['', [Validators.required ]],
      sexo: ['', [Validators.required ]],
    });


    this.idEstudiante = this.activateRoute.snapshot.params['id'];
  }



  ngOnInit(): void {
    if (this.idEstudiante !== undefined) {
      this.accion= "Editar";
      this.obtenerEstudiante();
    }
  }

  guardarEstudiante(){

    console.log(this.myform);
    const ESTUDIANTE : Estudiante={
      nombre: this.myform.get('nombre').value,
      correo: this.myform.get('correo').value,
      fechaIngreso: this.myform.get('fechaIngreso').value,
      telefono: this.myform.get('telefono').value,
      estadoCivil: this.myform.get('estadoCivil').value,
      sexo: this.myform.get('sexo').value,
    }

    if (this.idEstudiante !== undefined) {
          this.editarEstudiante(ESTUDIANTE);
    }else{
      this.agregarEstudiante(ESTUDIANTE);
    }

    this.route.navigate(['/']);
  }

  obtenerEstudiante(){
    const ESTUDIANTE: Estudiante = this._estudianteServices.obtenerEstudiante(this.idEstudiante);
    // console.log(ESTUDIANTE);
    this.myform.patchValue({
      nombre: ESTUDIANTE.nombre,
      correo: ESTUDIANTE.correo,
      fechaIngreso: ESTUDIANTE.fechaIngreso,
      telefono: ESTUDIANTE.telefono,
      estadoCivil: ESTUDIANTE.estadoCivil,
      sexo: ESTUDIANTE.sexo,
    })
  }


  editarEstudiante(estudiante: Estudiante){
    this._estudianteServices.editarEstudiante(estudiante, this.idEstudiante);
    this.snackbar.open('Estudiante actualizado con exito!' , '', {
      duration: 3000
    });
  }

  agregarEstudiante(estudiante: Estudiante){
    this._estudianteServices.agregarEstudiante(estudiante);
    this.snackbar.open('Estudiante registrado con exito!' , '', {
      duration: 3000
    });
  }

}
