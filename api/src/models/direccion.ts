export interface Direccion {
  id: number;         // ID de la dirección
  calle: string;      // Nombre de la calle
  altura: string; // Número de la calle
  ciudad: string;     // Ciudad
  personadni: string; // DNI de la persona asociada
}

export interface DireccionInfo {
  id?: number;  
  calle?: string; 
  altura?: string;
  ciudad?: string;
  personadni?: string;
}
