// Los tres estados posibles de un pedido
export type EstadoPedido = 'Pendiente' | 'En proceso' | 'Entregado';

// Lista de estados para reutilizarla en el <select> de cambiar estado
export const ESTADOS: EstadoPedido[] = ['Pendiente', 'En proceso', 'Entregado'];

// Un producto del inventario
export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
}

// Un pedido hecho por un cliente
export interface Pedido {
  id: number;
  cliente: string;
  productoId: number; // enlaza con Producto.id
  cantidad: number;
  fecha: string; // formato AAAA-MM-DD
  estado: EstadoPedido;
}