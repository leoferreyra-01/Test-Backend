export interface Direccion {
  id: number;         // ID de la dirección
  calle: string;      // Nombre de la calle
  altura: number; // Número de la calle
  ciudad: string;     // Ciudad
  personadni: number; // DNI de la persona asociada
}

export interface DireccionInfo {
  calle?: string; 
  altura?: number;
  ciudad?: string;
  personadni?: number;
}
