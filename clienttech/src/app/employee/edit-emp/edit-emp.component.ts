import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgForm } from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styleUrls: ['./edit-emp.component.css']
})
export class EditEmpComponent implements OnInit {

  constructor(public dialogbox: MatDialogRef<EditEmpComponent>,
    private service:EmployeeService,
    private snackBar:MatSnackBar) { }

    
public listItems: Array<string> = [];

  ngOnInit() {
    this.dropdownRefresh();
  }

  dropdownRefresh() {
    this.service.getDepDropDownValues().subscribe(data=>{
    data.forEach(element => {
      this.listItems.push(element["department_name"]);
      });
    })
  }

  onClose(){
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
      this.service.updateEmployee(form.value.id, form.value).subscribe(res=>
        {
          this.snackBar.open(res.toString(), '', {
            duration:5000,
            verticalPosition:'top'
          });
        })
      } else {
        form.value.status = false;
        this.service.updateEmployee(form.value.id, form.value).subscribe(res=>
          {
            this.snackBar.open(res.toString(), '', {
              duration:5000,
              verticalPosition:'top'
            });
          })
      }
     }
    }

}
