import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Medicine } from '../models/medicine.model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  medicines: Medicine[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<{ medicines: Medicine[] }>(environment.API_URL + '/medicine')
      .subscribe((res) => {
        console.log(res);
        this.medicines = res.medicines;
      });
  }

  deleteClicked(id: string) {
    console.log('dd', id);

    this.http
      .delete(environment.API_URL + '/medicine/' + id)
      .subscribe((res) => {
        console.log(res);
        this.medicines = this.medicines.filter((m) => m._id !== id);
      });
  }
}
