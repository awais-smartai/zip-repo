import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private HttpClient:HttpClient) { }
   signupuser(data:any) {
    return this.HttpClient.post('http://localhost:5000/api/v2/adminLogin',data)
  }
  addEmployee(data:any){
    return this.HttpClient.post('http://localhost:5000/api/v2/userSignup',data)
  }
  getAllEmployee(){
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('token', token)
    return this.HttpClient.get('http://localhost:5000/api/v2/getAllEmployee' , {headers})
  }
  getSingleEmployee(){
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('token', token)
    return this.HttpClient.get('http://localhost:5000/api/v2/getSingleEmployee' , {headers})
  }
}
