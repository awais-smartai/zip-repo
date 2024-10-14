import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'app/service/auth-service.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  id = ''
  email = ''
  name = ''
  address = ''
  phone=''
  constructor(private services : AuthServiceService ) { }

  ngOnInit() {
    this.services.getSingleEmployee().subscribe((data:any)=>{
      console.log(data)
      this.id = data.data.Employee_id
      this.email = data.data.Employee_email
      this.name = data.data.Employee_name
      this.address = data.data.Employee_address
      this.phone = data.data.Employee_phone
      console.log(this.email , 'eeee')
    })
  }

}
