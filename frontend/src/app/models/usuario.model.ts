import { Role } from "./role";

export interface Usuario {
    id?:number;
    username:string;
    nome:string;
    senha:string;
    role:Role;
}