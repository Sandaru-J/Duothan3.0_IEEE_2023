import { Component, Input, OnInit } from '@angular/core';
import { Medicine } from '../models/medicine.model';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss'],
})
export class MedicineComponent implements OnInit {
  @Input() medicine!: Medicine;
  constructor() {}

  ngOnInit(): void {}
}
