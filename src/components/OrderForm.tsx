import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Pedido, Producto } from '../types';

interface OrderFormProps {
  productos: Producto[]; // para llenar el <select> y validar el stock
  onAgregar: (pedido: Omit<Pedido, 'id' | 'estado'>) => void;
}

// Fecha de hoy en formato AAAA-MM-DD (para el valor inicial del input)
const obtenerHoy = () => new Date().toISOString().slice(0, 10);

function OrderForm({ productos, onAgregar }: OrderFormProps) {
  const [cliente, setCliente] = useState('');
  const [productoId, setProductoId] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [fecha, setFecha] = useState(obtenerHoy());
  const [error, setError] = useState('');

  const manejarEnvio = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validación 1: campos obligatorios
    if (!cliente.trim() || productoId === '' || cantidad === '' || !fecha) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const cantidadNumero = Number(cantidad);

    // Validación 2: cantidad entera y mayor a 0
    if (!Number.isInteger(cantidadNumero) || cantidadNumero <= 0) {
      setError('La cantidad debe ser un número entero mayor a 0.');
      return;
    }

    // Buscamos el producto elegido para revisar su stock
    const producto = productos.find((p) => p.id === Number(productoId));
    if (!producto) {
      setError('El producto seleccionado no existe.');
      return;
    }

    // Validación 3: la cantidad no puede superar el stock disponible
    if (cantidadNumero > producto.stock) {
      setError(`Stock insuficiente. Solo hay ${producto.stock} unidad(es).`);
      return;
    }

    onAgregar({
      cliente: cliente.trim(),
      productoId: producto.id,
      cantidad: cantidadNumero,
      fecha,
    });
    setCliente('');
    setProductoId('');
    setCantidad('');
    setFecha(obtenerHoy());
    setError('');
  };

  return (
    <form className="formulario" onSubmit={manejarEnvio}>
      <h2>Registrar pedido</h2>

      <label>
        Cliente
        <input
          type="text"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          placeholder="Ej: Ana Gómez"
        />
      </label>

      <label>
        Producto
        <select
          value={productoId}
          onChange={(e) => setProductoId(e.target.value)}
        >
          <option value="">-- Selecciona un producto --</option>
          {productos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} (stock: {p.stock})
            </option>
          ))}
        </select>
      </label>

      <label>
        Cantidad
        <input
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          placeholder="Ej: 2"
        />
      </label>

      <label>
        Fecha
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
      </label>

      {productos.length === 0 && (
        <p className="aviso">Primero registra al menos un producto.</p>
      )}
      {error && <p className="error">{error}</p>}

      <button type="submit" disabled={productos.length === 0}>
        Crear pedido
      </button>
    </form>
  );
}

export default OrderForm;