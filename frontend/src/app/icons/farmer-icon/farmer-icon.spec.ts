import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerIcon } from './farmer-icon';

describe('FarmerIcon', () => {
  let component: FarmerIcon;
  let fixture: ComponentFixture<FarmerIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
