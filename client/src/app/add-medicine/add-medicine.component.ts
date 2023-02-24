import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Medicine } from '../models/medicine.model';

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.scss'],
})
export class AddMedicineComponent implements OnInit {
  editMode: boolean = false;
  editId: string = '';
  medicine: Medicine | null = null;
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.route.snapshot.params['id']) {
      this.editMode = true;
      this.editId = this.route.snapshot.params['id'];
      this.http
        .get<{ medicine: Medicine }>(
          environment.API_URL + '/medicine/' + this.editId
        )
        .subscribe((res) => {
          console.log(res);
          this.medicine = res.medicine;
        });
    }
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (!form.valid) {
      return;
    }
    if (this.editMode) {
      this.http
        .patch(environment.API_URL + '/medicine/' + this.editId, {
          ...form.value,
        })
        .subscribe((res) => {
          console.log(res);
        });
      return;
    }
    this.http
      .post(environment.API_URL + '/medicine', {
        ...form.value,
      })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
