import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Producto } from '../types';

interface ProductFormProps {
  // La función viene de App.tsx; recibe un producto sin id (el id lo crea App)
  onAgregar: (producto: Omit<Producto, 'id'>) => void;
}

function ProductForm({ onAgregar }: ProductFormProps) {
  // Los inputs siempre manejan texto, por eso todo empieza como string
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [error, setError] = useState('');

  const manejarEnvio = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // evita que la página se recargue

    // Validación 1: campos obligatorios
    if (!nombre.trim() || !categoria.trim() || precio === '' || stock === '') {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const precioNumero = Number(precio);
    const stockNumero = Number(stock);

    // Validación 2: precio mayor a 0
    if (precioNumero <= 0) {
      setError('El precio debe ser mayor a 0.');
      return;
    }

    // Validación 3: stock entero y mayor o igual a 0
    if (!Number.isInteger(stockNumero) || stockNumero < 0) {
      setError('El stock debe ser un número entero mayor o igual a 0.');
      return;
    }

    // Todo bien: enviamos el producto a App y limpiamos el formulario
    onAgregar({
      nombre: nombre.trim(),
      categoria: categoria.trim(),
      precio: precioNumero,
      stock: stockNumero,
    });
    setNombre('');
    setCategoria('');
    setPrecio('');
    setStock('');
    setError('');
  };

  return (
    <form className="formulario" onSubmit={manejarEnvio}>
      <h2>Registrar producto</h2>

      <label>
        Nombre
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: Mouse inalámbrico"
        />
      </label>

      <label>
        Categoría
        <input
          type="text"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          placeholder="Ej: Accesorios"
        />
      </label>

      <label>
        Precio
        <input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          placeholder="Ej: 45000"
        />
      </label>

      <label>
        Stock
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Ej: 10"
        />
      </label>

      {error && <p className="error">{error}</p>}

      <button type="submit">Agregar producto</button>
    </form>
  );
}

export default ProductForm;