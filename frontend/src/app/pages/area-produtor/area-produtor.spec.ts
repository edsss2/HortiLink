import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaProdutor } from './area-produtor';

describe('AreaProdutor', () => {
  let component: AreaProdutor;
  let fixture: ComponentFixture<AreaProdutor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaProdutor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaProdutor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
