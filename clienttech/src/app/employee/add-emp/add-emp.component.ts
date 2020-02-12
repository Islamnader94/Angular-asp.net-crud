import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgForm } from '@angular/forms';

import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})
export class AddEmpComponent implements OnInit {

  constructor(public dialogbox: MatDialogRef<AddEmpComponent>,
    private service:EmployeeService,
    private snackBar:MatSnackBar) { }

public listItems: Array<string> = [];

    ngOnInit() {
      this.resetForm();
      this.dropdownRefresh();
    }

    dropdownRefresh() {
      this.service.getDepDropDownValues().subscribe(data=>{
      data.forEach(element => {
        this.listItems.push(element["department_name"]);
        });
      })
    }

    resetForm(form?:NgForm) {
      if(form!=null)
      form.resetForm();
  
      this.service.formData = { 
        id:0,
        name:'',
        department:'',
        status: true
      }
    }

    onClose() {
      this.dialogbox.close();
      this.service.filter('Register click');
    }

    onSubmit(form:NgForm) {
      var regex = /^[A-Za-z0-9 ]+$/
      var isValid = regex.test(form.value.name);
      if (!isValid) {
          alert("Employee name cannot contain special Characters!");
      } else {      
      if (form.value.status == "true") {
        form.value.status = true;
        this.service.addEmployee(form.value).subscribe(res=>
          {
            this.resetForm(form);
            this.snackBar.open(res.toString(), '', {
              duration:5000,
              verticalPosition:'top'
            });
          })
        } else {
          form.value.status = false;
          this.service.addEmployee(form.value).subscribe(res=>
            {
              this.resetForm(form);
              this.snackBar.open(res.toString(), '', {
                duration:5000,
                verticalPosition:'top'
              });
            })
        }
      }
      }

}
