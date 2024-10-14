import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  leaveForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.leaveForm = this.formBuilder.group({
      leaveType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }
  submitLeaveApplication() {
    if (this.leaveForm.invalid) {
      return;
    }

    // TODO: Implement leave application submission logic

    // Reset the form
    this.leaveForm.reset();
  }
  cancel() {

  }

}
