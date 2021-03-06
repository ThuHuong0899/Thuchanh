import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Staff }         from '../staff';
import { StaffService }  from '../staff.service';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: [ './staff-detail.component.css' ]
})
export class StaffDetailComponent implements OnInit {
  @Input() staff: Staff;

  constructor(
    private route: ActivatedRoute,
    private staffService: StaffService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getStaff();
  }

  getStaff(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.staffService.getStaff(id)
      .subscribe(staff => this.staff = staff);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.staffService.updateStaff(this.staff)
      .subscribe(() => this.goBack());
  }
}
