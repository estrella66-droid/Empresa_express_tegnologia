import { ESTADOS } from '../types';
import type { EstadoPedido, Pedido, Producto } from '../types';

interface OrderListProps {
  pedidos: Pedido[];
  productos: Producto[]; // para mostrar el nombre del producto
  onCambiarEstado: (id: number, nuevoEstado: EstadoPedido) => void;
}

function OrderList({ pedidos, productos, onCambiarEstado }: OrderListProps) {
  // Devuelve el nombre del producto a partir de su id
  const obtenerNombreProducto = (productoId: number) => {
    const producto = productos.find((p) => p.id === productoId);
    return producto ? producto.nombre : 'Producto no encontrado';
  };

  return (
    <section className="lista">
      <h2>Pedidos ({pedidos.length})</h2>

      {pedidos.length === 0 ? (
        <p className="vacio">Aún no hay pedidos registrados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Fecha</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.cliente}</td>
                <td>{obtenerNombreProducto(pedido.productoId)}</td>
                <td>{pedido.cantidad}</td>
                <td>{pedido.fecha}</td>
                <td>
                  {/* El select cambia el estado del pedido */}
                  <select
                    className={`estado estado-${pedido.estado.replace(' ', '-').toLowerCase()}`}
                    value={pedido.estado}
                    onChange={(e) =>
                      onCambiarEstado(pedido.id, e.target.value as EstadoPedido)
                    }
                  >
                    {ESTADOS.map((estado) => (
                      <option key={estado} value={estado}>
                        {estado}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default OrderList;