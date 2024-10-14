import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from 'app/service/auth-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent {
  signupForm!: FormGroup;
  formSubmitted = false;
  showPassword = false;

    constructor(private services: AuthServiceService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<EditDialogComponent>) { }
  closeDialog(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      employeeId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      joiningDate: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      address: ['', [Validators.required]],
      job: ['', [Validators.required]]
    });
  }
  onSignup() {
  this.formSubmitted = true;

  if (this.signupForm.invalid) {
    return;
  }

  let obj = {
    Employee_id: this.signupForm.value.employeeId,
    Employee_name: this.signupForm.value.name,
    salary: this.signupForm.value.salary,
    joiningDate: this.signupForm.value.joiningDate,
    Employee_password: this.signupForm.value.password,
    Employee_email: this.signupForm.value.email,
    Employee_address: this.signupForm.value.address,
    jobTitle: this.signupForm.value.job,
    role: this.signupForm.value.role,
    Employee_phone: this.signupForm.value.phone
  };

  console.log(obj);

  this.services.addEmployee(obj).subscribe(
    (data: any) => {
      console.log(data);
      Swal.fire({
        icon: 'success',
        title: 'Employee Created Successfully',
        position: 'center',
        showConfirmButton: false,
        timer: 1500
      });
    },
    (error: any) => {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while creating the employee. Please try again.',
        position: 'center',
        confirmButtonText: 'OK'
      });
    }
  );
}

  logout() {
    // Perform logout logic here
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
