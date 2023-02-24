import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AddMedicineComponent } from '../add-medicine/add-medicine.component';
import { Medicine } from '../models/medicine.model';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss'],
})
export class MedicineComponent implements OnInit {
  @Input() medicine!: Medicine;
  @Output() onDeleteClicked = new EventEmitter();
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private http: HttpClient
  ) {}

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

  deleteClicked() {
    console.log('dd', this.medicine._id);

    this.onDeleteClicked.emit(this.medicine._id);
  }
}
