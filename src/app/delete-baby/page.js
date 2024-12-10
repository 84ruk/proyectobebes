// src/app/delete-baby/page.js
'use client'
import { useEffect, useState } from 'react';

export default function DeleteBabyPage() {
  const [babies, setBabies] = useState([]);

  useEffect(() => {
    // Función para obtener los bebés desde la API
    const fetchBabies = async () => {
      const res = await fetch('/api/get-babies');
      if (res.ok) {
        const data = await res.json();
        setBabies(data);
      } else {
        console.error('Error al obtener los bebés');
      }
    };
    
    fetchBabies();
  }, []);

  // Función para manejar la eliminación de un bebé
  const handleDelete = async (babyId) => {
    const res = await fetch('/api/delete-baby', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ babyId }),
    });

    if (res.ok) {
      const data = await res.json();
      alert(data.message);  // Mostrar mensaje de éxito
      setBabies(babies.filter(baby => baby.id !== babyId));  // Eliminar el bebé de la lista
    } else {
      const errorData = await res.json();
      alert(errorData.error);  // Mostrar mensaje de error
    }
  };

  return (
    <div className="container">
      <h1>Eliminar Bebé</h1>
      <ul>
        {babies.map((baby) => (
          <li key={baby.id} className="baby-item">
            <span>{baby.name} - {new Date(baby.birthDate).toLocaleDateString()}</span>
            <button onClick={() => handleDelete(baby.id)} className="delete-btn">
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
