import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {StudentService} from '../student.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ClazzService} from '../clazz.service';
import {Clazz} from '../../model/Clazz';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  studentForm: FormGroup;
  id: number;
  obj: any;
  listClazz: Clazz[] = [];
  constructor(private studentService: StudentService,
              private activatedRoute: ActivatedRoute,
              private clazzService: ClazzService
              // ActivatedRoute lấy dữ liệu trên đường dẫn
              ) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getStudent(this.id);
    });
  }


  ngOnInit() {
    this.clazzService.getAll().subscribe((data) => {
      this.listClazz = data;
    });
  }
  getStudent(id: number) {
    return this.studentService.getById(id).subscribe(student => {
      this.studentForm = new FormGroup({
        name: new FormControl(student.name),
        score: new FormControl(student.score),
        age: new FormControl(student.age),
        clazzId: new FormControl(student.clazz.id),
      });
    });
  }
  update(id: number) {
    this.obj = {
      name: this.studentForm.value.name,
      age: this.studentForm.value.age,
      score: this.studentForm.value.score,
      clazz: {
        id: this.studentForm.value.clazzId
      }
    };
    this.studentService.update(id, this.obj).subscribe(() => {
      alert('Cập nhật thành công');
    }, e => {
      console.log(e);
    });
  }

}
