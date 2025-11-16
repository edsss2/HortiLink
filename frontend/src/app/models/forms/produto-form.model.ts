import { FormControl } from "@angular/forms";
import { Categoria } from "../categoria";
import { UnidadeMedida } from "../unidadeMedida";
    

export interface ProdutoForm {
    nome: FormControl<string | null>;
    descricao: FormControl<string | null>;
    dataColheita: FormControl<Date | null>;
    isOrganico: FormControl<boolean | null>;
    preco: FormControl<number | null>;
    promocao: FormControl<number | null>;
    quantidade: FormControl<number | null>;
    categoria: FormControl<Categoria | null>;
    unidadeMedida: FormControl<UnidadeMedida | null>;

}   