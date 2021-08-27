import Subcategoria from "./Subcatecorias";

export default interface Categoria {
	id: string;
    nome: string;
    cor: string;
    subcategorias?: Subcategoria[];
}