import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletarCadastro } from './completar-cadastro';

describe('CompletarCadastro', () => {
  let component: CompletarCadastro;
  let fixture: ComponentFixture<CompletarCadastro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletarCadastro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletarCadastro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
