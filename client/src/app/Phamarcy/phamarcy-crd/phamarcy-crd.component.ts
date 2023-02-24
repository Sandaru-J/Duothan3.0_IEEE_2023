import { Component, Input, OnInit } from '@angular/core';
import { Phmaracy } from 'src/app/models/phmaracy.model';
@Component({
  selector: 'app-phamarcy-crd',
  templateUrl: './phamarcy-crd.component.html',
  styleUrls: ['./phamarcy-crd.component.scss'],
})
export class PhamarcyCrdComponent implements OnInit {
  @Input() phamarcy!: Phmaracy;
  constructor() {}

  ngOnInit(): void {}
}
