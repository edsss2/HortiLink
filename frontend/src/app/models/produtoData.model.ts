import { Categoria } from './categoria';
import { UnidadeMedida } from './unidadeMedida';

export interface ProdutoData { 
  nome: string;
  descricao: string;
  dataColheita: Date; 
  isOrganico: boolean;
  preco: number; 
  promocao: number; 
  quantidade: number;
  categoria: Categoria;
  unidadeMedida: UnidadeMedida;
}