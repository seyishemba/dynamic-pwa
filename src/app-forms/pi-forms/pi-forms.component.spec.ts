import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiFormsComponent } from './pi-forms.component';

describe('PiFormsComponent', () => {
  let component: PiFormsComponent;
  let fixture: ComponentFixture<PiFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
