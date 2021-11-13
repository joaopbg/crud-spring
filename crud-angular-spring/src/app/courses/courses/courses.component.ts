import { ErrorDialogComponent } from './../../shared/error-dialog/error-dialog.component';
import { CoursesService } from './../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})



export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]>;
  displayedColumns = ['name', 'category'];


  constructor(private CoursesService : CoursesService,
              public dialog : MatDialog) {
    this.courses$ = this.CoursesService.list().pipe(
      catchError(error => {
        this.onError("Ops! Courses not found :/")
        return of([])
      })
    );
  }

  ngOnInit(): void {
  }

  onError( errorMsg: string){
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

}
