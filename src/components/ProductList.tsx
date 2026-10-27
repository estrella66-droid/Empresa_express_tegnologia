import type { Producto } from '../types';

interface ProductListProps {
  productos: Producto[];
}

function ProductList({ productos }: ProductListProps) {
  return (
    <section className="lista">
      <h2>Productos ({productos.length})</h2>

      {productos.length === 0 ? (
        <p className="vacio">Aún no hay productos registrados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {/* map recorre el vector y crea una fila por cada producto */}
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>{producto.categoria}</td>
                <td>${producto.precio.toLocaleString('es-CO')}</td>
                <td className={producto.stock === 0 ? 'agotado' : ''}>
                  {producto.stock}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default ProductList;