import Subcategoria from "./Subcatecorias";

export default interface Item {
    id: string;
    nome: string;
    descricao: string;
    descricaoTecnica: string;
    altura: number;
    largura: number;
    profundidade: number;
    peso: number;
    preco: number;
    imagemPrincipal: string;
    imagensCarrossel: string[];
    subcategorias: Subcategoria[];
}