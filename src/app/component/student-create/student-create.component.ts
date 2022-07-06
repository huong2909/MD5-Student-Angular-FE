import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Clazz} from '../../model/Clazz';
import {HttpClient} from '@angular/common/http';
import {StudentService} from '../../s/student.service';
import {ClazzService} from '../../s/clazz.service';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {
  studentForm: FormGroup = new FormGroup({
    name: new FormControl(),
    score: new FormControl(),
    age: new FormControl(),
    clazzId: new FormControl(),
  });
  obj: any;
  listClazz: Clazz[] = [];
  constructor(private httpClient: HttpClient,
              private studentService: StudentService,
              private clazzService: ClazzService) { }

  ngOnInit() {
    this.clazzService.getAll().subscribe((data) => {
      this.listClazz = data;
    });
  }
  submit() {
    this.obj = {
      name: this.studentForm.value.name,
      age: this.studentForm.value.age,
      score: this.studentForm.value.score,
      clazz: {
        id: this.studentForm.value.clazzId
      }
    };
    this.studentService.save(this.obj).subscribe(() => {
      alert('Thành công');
    }, error => {
      alert('Lỗi');
    }) ;
  }
}
