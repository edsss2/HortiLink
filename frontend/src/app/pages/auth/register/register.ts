import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormsModule, NonNullableFormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth-service';
import { Usuario } from '../../../models/usuario.model';
import { RegisterForm } from '../../../models/forms/register-form.model';
import { Role } from '../../../models/role';
import { map } from 'rxjs';
import { ValidationMessageComponent } from '../../../components/validation-message.component/validation-message.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, NgxMaskDirective, RouterLink, RouterLinkActive, ValidationMessageComponent, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {

  private fb = inject(NonNullableFormBuilder);
  public registerForm!: FormGroup<RegisterForm>;

  constructor(private authService : AuthService, private router : Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nome: [null as string | null, [
        Validators.required,
        Validators.minLength(3), 
        Validators.maxLength(50)
      ]],
      telefone: [null as string | null, Validators.required],
      role: [null as Role | null, Validators.required],
      email: [null as string | null, [
        Validators.required,
        Validators.email],
        [this.isEmailUnico.bind(this)]
      ],
      senha: [null as string | null, [
        Validators.required,
        this.validaSenha
      ]],
      confirmarSenha: [null as string | null, Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formData = this.registerForm.getRawValue();

    this.authService.register(formData as Usuario).subscribe({
      next: () => console.log("Usuário registrado com sucesso!"),
      error: (err) => alert("Erro ao cadastrar usuário")
    });
    
  }

  private validaSenha(control: AbstractControl): ValidationErrors | null {
    const senha = this.registerForm.get('senha')?.value;
    const confirmar = this.registerForm.get('confirmarSenha')?.value;

    if (senha !== confirmar) {
      this.registerForm.get('confirmarSenha')?.setErrors({ senhasDiferentes: true });
      return { senhasDiferentes: true };
    }

    return null;

  }

private isEmailUnico(control: AbstractControl) {
  return this.authService.isEmailUnico(control.value).pipe(
    map((emailExiste: boolean) => {
      return emailExiste ? { emailJaExiste: true } : null;
    })
  );
}
}
