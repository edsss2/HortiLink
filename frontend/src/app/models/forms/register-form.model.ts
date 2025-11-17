import { FormControl } from "@angular/forms";
import { Role } from "../role";

export interface RegisterForm {
    nome: FormControl<string | null>;
    email: FormControl<string | null>;
    telefone: FormControl<string | null>;
    role: FormControl<Role | null>;
    senha: FormControl<string | null>;
    confirmarSenha: FormControl<string | null>;
}