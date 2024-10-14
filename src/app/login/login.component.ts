import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder, Validators} from '@angular/forms';
import { AuthServiceService } from 'app/service/auth-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signupForm!: FormGroup;
  formSubmitted = false;
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

onLogin() {
  this.formSubmitted = true;

  if (this.signupForm.invalid) {
    return;
  }

  let obj = {
    Employee_email: this.signupForm.value.email,
    Employee_password: this.signupForm.value.password
  }

  this.authService.signupuser(obj).subscribe(
    (data: any) => {
      console.log(data);
      
      // Set the token in localStorage
      localStorage.setItem('token', data.token);

      localStorage.setItem('role',data.Role)
      
      // Show SweetAlert success message for successful login
      Swal.fire({
        title: 'Login Successful',
        text: 'You have successfully logged in!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/dashboard']);
        }
      });
    },
    (error: any) => {
      console.error(error);
      
      // Show SweetAlert error message for unsuccessful login
      Swal.fire({
        title: 'Login Unsuccessful',
        text: 'Invalid credentials. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  );
}



  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
