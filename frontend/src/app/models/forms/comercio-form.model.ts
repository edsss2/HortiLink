import { FormControl } from "@angular/forms";

export interface ComercioForm {
    nome: FormControl<string | null>;
    raioMaximoEntregakm: FormControl<number | null>;
    cep: FormControl<string | null>;
    rua: FormControl<string | null>;
    estado: FormControl<string | null>;
    numero: FormControl<string | null>;
    complemento: FormControl<string | null>;
    bairro: FormControl<string | null>;
    cidade: FormControl<string | null>;
}