import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importe para @if

@Component({
  selector: 'app-validation-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validation-message.component.html',
})
export class ValidationMessageComponent {

  // Recebe o campo do formulário (ex: produtoForm.controls.nome)
  @Input() control: AbstractControl | null = null;
  
  // Recebe o nome de um erro específico (para erros de grupo)
  @Input() controlName: string | null = null;

  // Um "dicionário" de mensagens de erro
  // Você pode adicionar todos os seus erros customizados aqui
  private errorMessages: Record<string, string> = {
    'required': 'Este campo é obrigatório.',
    'minlength': 'O valor é muito curto.',
    'maxlength': 'O valor é muito longo.',
    'min': 'O valor deve ser maior.',
    'pattern': 'O formato está incorreto (ex: deve ser um inteiro).',
    'senhaInvalida': 'As senhas devem ser iguais.',
    'emailJaExiste': 'Este email já possui uma conta.',
    'email': 'O email precisa ser válido',
    'dataFutura': 'A data não pode ser no futuro.',
    'promocaoInvalida': 'O preço promocional deve ser menor que o preço normal.'
  };

  /**
   * Verifica se o erro deve ser exibido.
   */
  shouldShowError(): boolean {
    if (this.controlName) {
      // Para erros de grupo (ex: promocaoInvalida)
      return this.control?.hasError(this.controlName) ?? false;
    }
    // Para erros de campo
    return (this.control?.invalid && (this.control?.touched || this.control?.dirty)) ?? false;
  }

  /**
   * Pega a primeira mensagem de erro encontrada.
   */
  get errorMessage(): string {
    if (this.controlName && this.control?.hasError(this.controlName)) {
      // Retorna a mensagem para o erro de grupo
      return this.errorMessages[this.controlName];
    }

    if (this.control?.errors) {
      // Pega a primeira chave de erro (ex: 'required')
      const errorKey = Object.keys(this.control.errors)[0];
      if (errorKey) {
        return this.errorMessages[errorKey] || 'Valor inválido.';
      }
    }
    return '';
  }
}

