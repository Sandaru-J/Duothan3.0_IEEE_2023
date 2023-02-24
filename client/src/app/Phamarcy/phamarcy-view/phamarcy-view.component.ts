import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Phmaracy } from 'src/app/models/phmaracy.model';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-phamarcy-view',
  templateUrl: './phamarcy-view.component.html',
  styleUrls: ['./phamarcy-view.component.scss'],
})
export class PhamarcyViewComponent implements OnInit {
  phamarcies: Phmaracy[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<{ users: Phmaracy[] }>(environment.API_URL + '/auth')
      .subscribe((res) => {
        console.log(res);
        this.phamarcies = res.users;
      });
  }
}
