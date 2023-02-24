import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhamarcyCrdComponent } from './phamarcy-crd.component';

describe('PhamarcyCrdComponent', () => {
  let component: PhamarcyCrdComponent;
  let fixture: ComponentFixture<PhamarcyCrdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhamarcyCrdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhamarcyCrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
