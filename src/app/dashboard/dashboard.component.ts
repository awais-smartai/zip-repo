import { Component, OnInit } from '@angular/core';
import { EmployeeDialogComponent } from 'app/employee-dialog/employee-dialog.component';
import * as Chartist from 'chartist';
import { MatDialog } from '@angular/material/dialog';
import { AuthServiceService } from 'app/service/auth-service.service';
import { EditDialogComponent } from 'app/edit-dialog/edit-dialog.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  employees: any[] = [];
  employeeAttendance: any[] = [];
  leaveApplication: any[] = [];
  showAllEmployees = false;
  employeeCount: number = 0;
  totalSalary: number = 0;
  displayCount = 2;
  name = ''
  email = ''

  constructor(private dialog: MatDialog, private services: AuthServiceService) { }
  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };
  ngOnInit() {
    this.services.getAllEmployee().subscribe((data: any) => {
      console.log("========>", data.employees)
      this.employees = data.employees;
      this.employeeCount = data.count;
      this.name = data.employees[0].Employee_name;
      console.log(this.name);
      // data.employees.forEach((employee: any) => {
      //   console.log("====>", employee.Employee_name);
      //   this.name = employee.Employee_name
      //   // const token = localStorage.getItem('token')
      //   // console.log(token)
      // });

    })
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

    const dataDailySalesChart: any = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [
        [12, 17, 7, 17, 23, 18, 38]
      ]
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    // var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    // this.startAnimationForLineChart(dailySalesChart);


    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    const dataCompletedTasksChart: any = {
      labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
      series: [
        [230, 750, 450, 300, 280, 240, 200, 190]
      ]
    };

    const optionsCompletedTasksChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    }

    // var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    // // start animation for the Completed Tasks Chart - Line Chart
    // this.startAnimationForLineChart(completedTasksChart);



    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    var datawebsiteViewsChart = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

      ]
    };
    var optionswebsiteViewsChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 1000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
    };
    var responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    // var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    // //start animation for the Emails Subscription Chart
    // this.startAnimationForBarChart(websiteViewsChart);
  }
  addEmployee(employeeData: any) {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '400px',
      data: {} // You can pass any data to the dialog if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle the result when the dialog is closed
      if (result) {
        // The dialog returned a result (e.g., employee data), you can handle it here
        this.addEmployee(result); // Pass the result to the addEmployee method
      }
      this.calculateTotalSalary();
    });
  }
  calculateTotalSalary() {
    this.totalSalary = this.employees.reduce(
      (total, employee) => total + employee.salary,
      0
    );
  }

  get displayedEmployees(): any[] {
    return this.showAllEmployees ? this.employees : this.employees.slice(0, 3);
  }

  showMore(): void {
    this.displayCount = this.employees.length;
    this.showAllEmployees = true;
  }

  showLess() {
    this.displayCount = 2;
    this.showAllEmployees = false;
  }




  submitEmployees() { }

  edit(editData: any) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '400px',
      data: {} // You can pass any data to the dialog if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle the result when the dialog is closed
      if (result) {
        // The dialog returned a result (e.g., employee data), you can handle it here
        this.addEmployee(result); // Pass the result to the addEmployee method
      }
      this.calculateTotalSalary();
    });
  }
  deleteEmployee() {
    Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire(
      'Deleted!',
      'Employee Deleted Sucessfully.',
      'success'
    )
  }
})
  }


}
