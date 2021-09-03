export default interface Categoria {
	id: string;
    nome: string;
    cor: string;
    subcategorias?: string[];
    lastModification?: number;
    autor?: string;
}