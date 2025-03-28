// src/app/models/producto.model.ts

export interface Producto {
    id_producto: number;
    nom_producto: string;
    descripcion: string;
    precio: number;
    is_oferta: boolean;
    porcentaje_oferta: number;
    precio_final: number;
    stock: number;
  }
  