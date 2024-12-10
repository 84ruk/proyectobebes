'use client'
// src/app/register-diaper-change/page.js
import { useEffect, useState } from 'react';

export default function RegisterDiaperChangePage() {
  const [babies, setBabies] = useState([]);
  const [diaperDetails, setDiaperDetails] = useState('');

  // Obtener los bebés y su último registro de cambio de pañal
  useEffect(() => {
    const fetchBabies = async () => {
      const res = await fetch('/api/get-babies-with-last-diaper-change');
      if (res.ok) {
        const data = await res.json();
        setBabies(data);
      } else {
        console.error('Error al obtener los bebés');
      }
    };

    fetchBabies();
  }, []);

  // Función para manejar el registro de cambio de pañal
  const handleRegisterDiaperChange = async (babyId) => {
    if (!diaperDetails) {
      alert('Por favor, ingresa los detalles del cambio de pañal');
      return;
    }

    const res = await fetch('/api/register-diaper-change', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ babyId, diaperDetails }),
    });

    if (res.ok) {
      const data = await res.json();
      alert(data.message);  // Mostrar mensaje de éxito
      setBabies((prevBabies) =>
        prevBabies.map((baby) =>
          baby.id === babyId
            ? { ...baby, activities: [{ details: diaperDetails, timestamp: new Date() }] }
            : baby
        )
      );
      setDiaperDetails('');  // Limpiar el campo de detalles
    } else {
      const errorData = await res.json();
      alert(errorData.error);  // Mostrar mensaje de error
    }
  };

  return (
    <div className="container">
      <h1>Registrar Cambio de Pañal</h1>
      <div>
        {babies.map((baby) => (
          <div key={baby.id} className="baby-item">
            <span>{baby.name} - {new Date(baby.birthDate).toLocaleDateString()}</span>
            <div>
              <input
                type="text"
                value={diaperDetails}
                onChange={(e) => setDiaperDetails(e.target.value)}
                placeholder="Detalles del cambio de pañal"
              />
              <button
                onClick={() => handleRegisterDiaperChange(baby.id)}
                className="register-diaper-btn"
              >
                Registrar Cambio de Pañal
              </button>
            </div>
            {baby.activities.length > 0 && (
              <p>Último cambio de pañal: {new Date(baby.activities[0].timestamp).toLocaleString()}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
