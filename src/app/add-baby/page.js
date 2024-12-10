'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddBaby() {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/add-baby', {
      method: 'POST',
      body: JSON.stringify({ name, birthDate }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      router.push('/');  // Redirige a la página principal si todo sale bien
    } else {
      alert('Hubo un error al agregar el bebé');
    }
  };

  return (
    <div>
      <h1>Agregar Bebé</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="birthDate">Fecha de Nacimiento</label>
          <input
            type="date"
            id="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Agregar Bebé</button>
      </form>
    </div>
  );
}
