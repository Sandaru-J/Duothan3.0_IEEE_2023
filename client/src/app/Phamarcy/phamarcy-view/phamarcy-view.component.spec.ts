import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhamarcyViewComponent } from './phamarcy-view.component';

describe('PhamarcyViewComponent', () => {
  let component: PhamarcyViewComponent;
  let fixture: ComponentFixture<PhamarcyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhamarcyViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhamarcyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
