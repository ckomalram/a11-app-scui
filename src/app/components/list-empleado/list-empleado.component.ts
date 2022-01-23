import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { Estudiante } from 'src/app/models/estudiante';
import { MensajeConfirmacionComponent } from '../shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-list-empleado',
  templateUrl: './list-empleado.component.html',
  styleUrls: ['./list-empleado.component.css']
})
export class ListEmpleadoComponent implements OnInit, AfterViewInit {
  listEstudiante: Estudiante[] = [];
  displayedColumns: string[] = ['nombre', 'correo', 'estadoCivil', 'sexo', 'telefono', 'fechaIngreso', 'acciones'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  constructor(private _estudianteService: EstudianteService, public dialog: MatDialog,
    public snackbar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.cargarEstudiante();
  }
  ngAfterViewInit() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarEstudiante() {
    this.listEstudiante = this._estudianteService.getEstudiante();
    this.dataSource = new MatTableDataSource(this.listEstudiante);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // console.log(this.listEstudiante);
  }

  eliminarEstudiante(index: number) {

    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: { mensaje: 'Estas seguro que deseas eliminar el estudiante?' }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === 'aceptar') {
        this._estudianteService.eliminarEstudiante(index);
        this.cargarEstudiante();
        this.snackbar.open('Estudiante eliminado con exito!' , '', {
          duration: 2000
        });
      }

    });


  }

}
