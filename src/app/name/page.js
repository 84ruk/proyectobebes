'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NamePage() {
  const [name, setName] = useState('');
  const router = useRouter();

  // Función para manejar el envío del nombre
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Guardar el nombre en cookies
    document.cookie = `name=${name}; path=/; max-age=31536000`; // Guarda por un año

    // Redirigir a la página principal
    router.push('/welcome');
  };

  return (
    <div>
      <h1>Introduce tu nombre</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Escribe tu nombre"
          required
        />
        <button type="submit">Aceptar</button>
      </form>
    </div>
  );
}
