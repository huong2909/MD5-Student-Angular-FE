import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {StudentService} from '../../s/student.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-student-delete',
  templateUrl: './student-delete.component.html',
  styleUrls: ['./student-delete.component.css']
})
export class StudentDeleteComponent implements OnInit {

  studentForm: FormGroup;
  id: number;
  constructor(private studentService: StudentService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getStudent(this.id);
    });
  }

  ngOnInit() {
  }
  getStudent(id: number) {
    return this.studentService.getById(id).subscribe(student => {
      this.studentForm = new FormGroup({
        name: new FormControl(student.name),
        score: new FormControl(student.score),
        age: new FormControl(student.age),
        clazz: new FormControl(student.clazz.name),
      });
    });
  }
  delete(id: number) {
    this.studentService.delete(id).subscribe(() => {
      this.router.navigate(['/']);
      alert('Xoá thành công');
    }, e => {
      console.log(e);
    });
  }

}
