import { Component, OnInit } from '@angular/core';
import { Phmaracy } from 'src/app/models/phmaracy.model';

@Component({
  selector: 'app-phamarcy-view',
  templateUrl: './phamarcy-view.component.html',
  styleUrls: ['./phamarcy-view.component.scss']
})
export class PhamarcyViewComponent implements OnInit {
  phamarcies: Phmaracy[]= [];
  constructor() { }

  ngOnInit(): void {
  }

}
