import { Component, OnInit ,ViewChild} from '@angular/core';

import { MatTableDataSource, MatSort} from '@angular/material';
import { Employee } from 'src/app/models/employee-model';
import { EmployeeService } from 'src/app/services/employee.service';

import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddEmpComponent } from 'src/app/employee/add-emp/add-emp.component';

import { MatSnackBar } from '@angular/material';
import { EditEmpComponent } from '../edit-emp/edit-emp.component';
import { element } from 'protractor';


@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service: EmployeeService,
    private dialog:MatDialog,
    private snackBar:MatSnackBar)  { 
      this.service.listen().subscribe((m:any)=>{
        console.log(m);
        this.refreshEmpList();
      })
  }

  ListData : MatTableDataSource<any>;
  displayColumns : string[] = ['Options', 'EmployeeName', 'Department', 'Record Status']

  @ViewChild(MatSort, null) sort: MatSort;


  ngOnInit() {
    this.refreshEmpList();
  }

  refreshEmpList() {
    this.service.getEmpList().subscribe(data => {
      this.ListData  = new MatTableDataSource(data);
      this.ListData.sort = this.sort;
  });
}
  onEdit(emp: Employee) {
    this.service.formData = emp;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus= true;
    dialogConfig.width= "70%";
    this.dialog.open(EditEmpComponent, dialogConfig);
  }

  applyFilter(filtervalue: string) {
    this.ListData.filter= filtervalue.trim().toLocaleLowerCase();
  }

  onDelete(id:number) {
    if(confirm('Are you sure to delete??')) {
      this.service.deleteEmployee(id).subscribe(res=>{
        this.refreshEmpList();
        this.snackBar.open(res.toString(), '', {
          duration:5000,
          verticalPosition:'top'
        });
      });
    }
  }

  onAdd(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus= true;
    dialogConfig.width= "70%";
    this.dialog.open(AddEmpComponent, dialogConfig);
  }

}
