import Role from "./Role";

export default interface Usuario {
    id: string;
    email: string;
    nome: string;
    role: Role[];
}