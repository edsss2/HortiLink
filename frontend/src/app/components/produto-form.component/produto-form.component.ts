import { Component, OnInit, Input, inject } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { AbstractControl, FormGroup, NonNullableFormBuilder, ValidationErrors, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProdutoForm } from '../../models/forms/produto-form.model';
import { Categoria } from '../../models/categoria';
import { UnidadeMedida } from '../../models/unidadeMedida';
import { ProdutoData } from '../../models/produtoData.model';
import { CommonModule } from '@angular/common';
import { ImageUploaderComponent } from '../image-uploader.component/image-uploader.component';
import { ProdutoService } from '../../services/produto-service';
import { ValidationMessageComponent } from '../validation-message.component/validation-message.component';

@Component({
  selector: 'app-produto-form',
  imports: [
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CommonModule,
    ImageUploaderComponent,
    ValidationMessageComponent
  ],
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.css',
})
export class ProdutoFormComponent implements OnInit {

  constructor(private produtoService: ProdutoService) {}

  private fb = inject(NonNullableFormBuilder);
  @Input() produtoParaEditar: ProdutoData | null = null;

  public listaCategoria = Object.values(Categoria);
  public listaUnidadeMedida = Object.values(UnidadeMedida);

  public produtoForm! : FormGroup<ProdutoForm>;

  public mainImageError = false;
  private mainImageFile: File | null = null;
  private additionalImageFiles: File[] = [];

  setMainImage(file: File | null) {
    this.mainImageFile = file;
  }

  setAdditionalImages(files: File[]) {
    this.additionalImageFiles = files;
  }

onSubmit() {
  this.mainImageError = false;

  if (!this.mainImageFile) {
    this.mainImageError = true;
    return;
  }

  if (this.produtoForm.invalid) {
    this.produtoForm.markAllAsTouched();
    return;
  }

  const formData = this.produtoForm.getRawValue();

  this.produtoService.salvarProduto(
    formData as ProdutoData,
    this.mainImageFile,
    this.additionalImageFiles  
  ).subscribe({
    next: () => console.log('Produto salvo com sucesso!'),
    error: (err) => console.error('Erro ao salvar:', err)
  });
}


  ngOnInit(): void {
    this.produtoForm = this.fb.group({
      nome: [null as string | null, [
        Validators.required,
        Validators.minLength(3), 
        Validators.maxLength(50)
      ]],
      descricao: [null as string | null, [
        Validators.required,
        Validators.maxLength(250)
      ]],
      dataColheita: [null as Date | null, [
        Validators.required,
        this.dataNaoPodeSerFutura
      ]],
      isOrganico: [false as boolean | null],
      preco: [null as number | null, [
        Validators.required,
        Validators.min(0.01)
      ]],
      promocao: [null as number | null, [
        Validators.required,
        Validators.min(0)
      ]],
      quantidade: [null as number | null, [
        Validators.required,
        Validators.min(0),
        Validators.pattern(/^[0-9]+$/)
      ]],
      categoria: [null as Categoria | null, Validators.required],
      unidadeMedida: [null as UnidadeMedida | null, Validators.required]
    }, {
      validators: [ this.promocaoMenorQuePreco ]
    });

    if (this.produtoParaEditar) {
      this.produtoForm.patchValue(this.produtoParaEditar);
    }
  }

  private dataNaoPodeSerFutura(form: AbstractControl): ValidationErrors | null {
    const dataSelecionada = form.value as Date;
    if (!dataSelecionada) {
      return null;
    }
    
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); 
    
    if (dataSelecionada > hoje) {
      return { dataFutura: true }; // Erro!
    }
    
    return null; // Válido
  }

  private promocaoMenorQuePreco(form: AbstractControl): ValidationErrors | null {
    const preco = form.get('preco')?.value;
    const promocao = form.get('promocao')?.value;

    // Se ambos existem e a promoção é maior...
    if (promocao && preco && promocao >= preco) {
      // Retorna um erro para o formulário
      return { promocaoInvalida: true };
    }
    
    return null; // Válido
  }
}
