export interface Produto {
    id?:number;
    nome:string;
    nomeComercio: string;
    valor: string;
    promocao: string;
    organico: boolean;
    unidadeMedida: string;
    tipoVendedor: string;

    imagemUrl: string;
}