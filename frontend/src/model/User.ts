import Role from "./Role";

export default interface Usuario {
    id: number;
    email: string;
    nome: string;
    role: Role[];
}