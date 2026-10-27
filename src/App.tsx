import { useState } from 'react';
import './App.css';
import type { EstadoPedido, Pedido, Producto } from './types';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';

function App() {
  // Los datos viven en memoria: dos vectores (arreglos) con useState
  const [productos, setProductos] = useState<Producto[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  // Agrega un producto nuevo al vector de productos
  const agregarProducto = (datos: Omit<Producto, 'id'>) => {
    const nuevoProducto: Producto = { id: Date.now(), ...datos };
    setProductos([...productos, nuevoProducto]);
  };

  // Agrega un pedido (estado inicial: Pendiente) y descuenta el stock
  const agregarPedido = (datos: Omit<Pedido, 'id' | 'estado'>) => {
    const nuevoPedido: Pedido = {
      id: Date.now(),
      estado: 'Pendiente',
      ...datos,
    };
    setPedidos([...pedidos, nuevoPedido]);

    // Descontamos del stock la cantidad pedida
    setProductos(
      productos.map((producto) =>
        producto.id === datos.productoId
          ? { ...producto, stock: producto.stock - datos.cantidad }
          : producto
      )
    );
  };

  // Cambia el estado de un pedido específico
  const cambiarEstado = (id: number, nuevoEstado: EstadoPedido) => {
    setPedidos(
      pedidos.map((pedido) =>
        pedido.id === id ? { ...pedido, estado: nuevoEstado } : pedido
      )
    );
  };

  return (
    <div className="app">
      <header>
        <h1>🛒 Tienda Express</h1>
        <p>Gestión de productos y pedidos</p>
      </header>

      <main>
        <div className="columna">
          <ProductForm onAgregar={agregarProducto} />
          <ProductList productos={productos} />
        </div>

        <div className="columna">
          <OrderForm productos={productos} onAgregar={agregarPedido} />
          <OrderList
            pedidos={pedidos}
            productos={productos}
            onCambiarEstado={cambiarEstado}
          />
        </div>
      </main>
    </div>
  );
}

export default App;