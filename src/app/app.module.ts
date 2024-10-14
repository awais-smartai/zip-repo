import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastrModule } from 'ngx-toastr';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatDialogModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
     ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-right'
    }) 
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    EmployeeDialogComponent,
    EditDialogComponent,
    ForgotPasswordComponent,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
