import { Direccion } from "./direccion";

export interface Persona {
  dni: string;        // DNI o ID de la persona
  nombre: string;     // Nombre de la persona
  apellido: string;   // Apellido de la persona
  edad: number;       // Edad de la persona
  foto?: string;      // URL o path a la foto de la persona
}

export interface PersonaConDirecciones extends Persona {
  direcciones: Direccion[]; // Lista de direcciones asociadas
}