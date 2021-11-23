import Subcategoria from "./Subcatecorias";

export default interface Item {
    id: string;
    nome: string;
    subtitulo?: string;
    descricao?: string;
    descricaoTecnica?: string;
    altura?: number;
    largura?: number;
    profundidade?: number;
    peso?: number;
    preco?: number;
    imagemPrincipal?: string;
    imagemIcone?: string;
    imagensCarrossel?: string[];
    imagensMosaico?: string[];
    subcategoria?: Subcategoria;
    ehOferta?: boolean;
    promocaoPorcentagem?: number;
    promocaoFixa?: number;
    fixarNoInicio?: boolean;
    quantidade?: number;
    lastModification?: number;
    autor?: string;
}