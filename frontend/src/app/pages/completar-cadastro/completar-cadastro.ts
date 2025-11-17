import { Component, inject, OnInit, signal } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar.component';
import { Footer } from "../../components/footer/footer.component";
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ComercioForm } from '../../models/forms/comercio-form.model';
import { ValidationMessageComponent } from '../../components/validation-message.component/validation-message.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { RouterLink } from '@angular/router';
import { ComercioService } from '../../services/comercio-service';
import { Comercio } from '../../models/comercioData';

@Component({
  selector: 'app-completar-cadastro',
  imports: [Navbar, Footer, ValidationMessageComponent, ReactiveFormsModule, NgxMaskDirective, RouterLink],
  templateUrl: './completar-cadastro.html',
  styleUrl: './completar-cadastro.css',
})
export class CompletarCadastro implements OnInit {

  public comercioForm!: FormGroup<ComercioForm>;
  private fb = inject(NonNullableFormBuilder);

  constructor(private comercioService: ComercioService) { }

  onSubmit() {
    console.log("entrou no submit")
    if (this.comercioForm.invalid) {
      console.log("Formuario invalido")
      this.logValidationErrors();
      this.comercioForm.markAllAsTouched();
      return;
    }

    const formData = this.comercioForm.getRawValue();

    this.comercioService.salvarProduto(formData as Comercio).subscribe({
      next: () => console.log('Produto salvo com sucesso!'),
      error: (err) => console.error('Erro ao salvar:', err)
    });

  }

  ngOnInit(): void {
    this.comercioForm = this.fb.group({
      nome: [null as string | null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],

      // Sugestão: Adicionado Validators.min(1)
      raioMaximoEntregakm: [null as number | null, [
        Validators.required,
        Validators.min(1)
      ]],

      cep: [null as string | null, [
        Validators.required,
        Validators.pattern('^[0-9]{8}$') // Expressão regular para 8 dígitos numéricos
      ]],

      rua: [null as string | null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],

      // Corrigido: Para aceitar siglas de 2 letras (ex: SP, MG)
      estado: [null as string | null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(2)
      ]],

      numero: [null as string | null, [
        Validators.required,
        Validators.pattern('^[0-9]+$') // Garante que só há dígitos (pelo menos 1)
      ]],

      // Sugestão: Complemento geralmente é opcional (removido required e minLength)
      complemento: [null as string | null, [
        Validators.maxLength(50)
      ]],

      bairro: [null as string | null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],

      cidade: [null as string | null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]]
    });
  }



  listaEstados = [
    { sigla: 'AC', nome: 'Acre' },
    { sigla: 'AL', nome: 'Alagoas' },
    { sigla: 'AP', nome: 'Amapá' },
    { sigla: 'AM', nome: 'Amazonas' },
    { sigla: 'BA', nome: 'Bahia' },
    { sigla: 'CE', nome: 'Ceará' },
    { sigla: 'DF', nome: 'Distrito Federal' },
    { sigla: 'ES', nome: 'Espírito Santo' },
    { sigla: 'GO', nome: 'Goiás' },
    { sigla: 'MA', nome: 'Maranhão' },
    { sigla: 'MT', nome: 'Mato Grosso' },
    { sigla: 'MS', nome: 'Mato Grosso do Sul' },
    { sigla: 'MG', nome: 'Minas Gerais' },
    { sigla: 'PA', nome: 'Pará' },
    { sigla: 'PB', nome: 'Paraíba' },
    { sigla: 'PR', nome: 'Paraná' },
    { sigla: 'PE', nome: 'Pernambuco' },
    { sigla: 'PI', nome: 'Piauí' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'RN', nome: 'Rio Grande do Norte' },
    { sigla: 'RS', nome: 'Rio Grande do Sul' },
    { sigla: 'RO', nome: 'Rondônia' },
    { sigla: 'RR', nome: 'Roraima' },
    { sigla: 'SC', nome: 'Santa Catarina' },
    { sigla: 'SP', nome: 'São Paulo' },
    { sigla: 'SE', nome: 'Sergipe' },
    { sigla: 'TO', nome: 'Tocantins' }
  ];

  /**
   * Função de debug: Itera por todos os campos do formulário
   * e imprime os erros de validação no console.
   */
  logValidationErrors() {
    console.log("--- Verificando Erros de Validação ---");
    
    // Pega todas as chaves (nomes dos campos) do seu form
    Object.keys(this.comercioForm.controls).forEach(key => {
      
      // Pega o controle (o campo em si)
      const control = this.comercioForm.get(key);
      
      // Verifica se o campo existe e se está inválido
      if (control && control.invalid) {
        
        // control.errors é um objeto JSON com os erros
        // Ex: { required: true }
        // Ex: { pattern: { requiredPattern: '^[0-9]{8}$', actualValue: '123' } }
        // Ex: { min: { min: 1, actual: 0 } }
        
        console.log(`❌ Erro no campo [${key}]:`, control.errors);
      }
    });
    
    console.log("-----------------------------------------");
  }
}
