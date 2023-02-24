import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddMedicineComponent } from '../add-medicine/add-medicine.component';
import { Medicine } from '../models/medicine.model';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss'],
})
export class MedicineComponent implements OnInit {
  @Input() medicine!: Medicine;
  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddMedicineComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  editClicked() {
    this.router.navigate(['/manage-medicine', this.medicine._id]);
  }
}
