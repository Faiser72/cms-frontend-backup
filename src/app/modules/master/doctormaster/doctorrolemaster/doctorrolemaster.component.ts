import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { DoctorrolemasterserviceService } from 'src/app/modules/service/doctorrolemaster/doctorrolemasterservice.service';
import { disablePrefixSpace } from 'src/app/modules/admin/custom.validation';

@Component({
  selector: 'app-doctorrolemaster',
  templateUrl: './doctorrolemaster.component.html',
  styleUrls: ['./doctorrolemaster.component.scss']
})
export class DoctorrolemasterComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: any;
  addDoctorRoleMasterForm: FormGroup;

  searchValue: string = null;
  displayedColumns: string[] = [
    "slNo",
    "doctorRoleName",
    "action"
  ];
  doctorRoleDetailsList: any;
  doctorRoleDetailsListExceptOne: any;

  constructor(private fb: FormBuilder,
    private doctorRoleMasterService: DoctorrolemasterserviceService, private _snackBar: MatSnackBar,
    private router: Router) {
    this.addDoctorRoleMasterFormBuilder();
  }

  ngOnInit() {
    this.doctorRoleMasterService.getDoctorRoleMasterList().subscribe((data: any) => {
      if (data.success) {
        this.doctorRoleDetailsList = data['listObject'];
        this.dataSource = new MatTableDataSource(data['listObject']);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.customFilter();
      } else {
        this.dataSource = new MatTableDataSource();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
  customFilter() {
    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = data.doctorRoleName;
      return dataStr.trim().toLowerCase().indexOf(filter) != -1;
    }
  }

  addDoctorRoleMasterFormBuilder() {
    this.addDoctorRoleMasterForm = this.fb.group({
      doctorRoleId: [0],
      doctorRoleName: [null, [Validators.required, disablePrefixSpace]],
    });
    this.addDoctorRoleMasterForm.setValidators(this.customValidation());
  }

  doctorRoleNameInputMsg: string; doctorRoleName: string;
  customValidation(): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors => {
      const doctorRoleNameFormGroup = formGroup.controls['doctorRoleName'];
      if (doctorRoleNameFormGroup.value !== '' && doctorRoleNameFormGroup.value !== null) {
        if (doctorRoleNameFormGroup.valid) {
          if (this.btnFlag) {
            if (!isNullOrUndefined(this.doctorRoleDetailsListExceptOne)) {
              this.doctorRoleDetailsListExceptOne.forEach((data: any) => {
                if (data.doctorRoleName.toLowerCase() == doctorRoleNameFormGroup.value.trim().toLowerCase().replace(/\s+/g, ' ')) {
                  this.doctorRoleName = data.doctorRoleName.toLowerCase();
                  this.doctorRoleNameInputMsg = 'This doctorRole name already exist.';
                  doctorRoleNameFormGroup.setErrors({});
                }
              });
            }
          } else {
            if (!isNullOrUndefined(this.doctorRoleDetailsList)) {
              this.doctorRoleDetailsList.forEach((data: any) => {
                if (data.doctorRoleName.toLowerCase() == doctorRoleNameFormGroup.value.trim().toLowerCase().replace(/\s+/g, ' ')) {
                  this.doctorRoleName = data.doctorRoleName.toLowerCase();
                  this.doctorRoleNameInputMsg = 'This doctorRole name already exist.';
                  doctorRoleNameFormGroup.setErrors({});
                }
              });
            }
          }
        } else {
          if (this.doctorRoleName == doctorRoleNameFormGroup.value.trim().toLowerCase().replace(/\s+/g, ' ')) {
            this.doctorRoleNameInputMsg = 'This doctorRole name already exist.';
          } else {
            this.doctorRoleNameInputMsg = 'Please enter a valid doctoRRole name';
          }
        }
      } else {
        this.doctorRoleNameInputMsg = 'Please enter this field.';
      }

      return;
    };
  }

  saveDoctorRoleDetails() {
    let doctorRoleName = this.addDoctorRoleMasterForm.get('doctorRoleName').value;
    this.addDoctorRoleMasterForm.patchValue({ doctorRoleName: doctorRoleName.trim().replace(/\s+/g, ' ') });
    if (this.addDoctorRoleMasterForm.valid) {
      this.doctorRoleMasterService.saveDoctorRoleMasterDetails(this.addDoctorRoleMasterForm.value).subscribe((resp: any) => {
        if (resp.success) {
          alert(resp.message);
          this.customReset();
        } else {
          alert(resp.message);
        }
      });
    } else {
      alert("please fill the proper Details")
      return false;
    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  routeToDeleteDoctorRole(doctorRoleDetails: any) {
    let index = this.doctorRoleDetailsList.findIndex((data: any) => data.doctorRoleId === doctorRoleDetails.doctorRoleId);
    if ((doctorRoleDetails.doctorRoleId > 0) && (index > -1)) {
      this.doctorRoleMasterService.deleteDoctorRoleMasterDetails(doctorRoleDetails.doctorRoleId).subscribe((resp: any) => {
        this.doctorRoleDetailsList.splice(index, 1);
        this.customReset();
        this._snackBar.open(doctorRoleDetails.doctorRoleName, resp.message, { duration: 2500 });
      });
    }
  }

  btnFlag: boolean = false;
  routeToEditDoctorRole(doctorRoleDetails: any) {
    this.btnFlag = true;
    this.doctorRoleMasterService.getDoctorRoleMasterListExceptOne(doctorRoleDetails.doctorRoleId).subscribe((data: any) => {
      this.doctorRoleDetailsListExceptOne = data.listObject;
      this.addDoctorRoleMasterForm.patchValue({
        doctorRoleName: doctorRoleDetails.doctorRoleName,
        doctorRoleId: doctorRoleDetails.doctorRoleId
      });
    });
  }

  updateDoctorRoleDetails() {
    let doctorRoleName = this.addDoctorRoleMasterForm.get('doctorRoleName').value;
    this.addDoctorRoleMasterForm.patchValue({ doctorRoleName: doctorRoleName.trim().replace(/\s+/g, ' ') });
    if (this.addDoctorRoleMasterForm.valid) {
      this.doctorRoleMasterService.updateDoctorRoleMasterDetails(this.addDoctorRoleMasterForm.value).subscribe((resp: any) => {
        if (resp.success) {
          alert(resp.message);
          this.customReset();
        } else {
          alert(resp.message);
        }
      });
    } else {
      alert("please fill the proper Details")
      return false;
    }
  }


  customReset() {
    this.addDoctorRoleMasterForm.reset();
    this.ngOnInit();
    this.btnFlag = false;
    this.searchValue = null;
  }


}
