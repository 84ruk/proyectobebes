// src/app/register-nap/page.js
import { useEffect, useState } from 'react';

export default function RegisterNapPage() {
  const [babies, setBabies] = useState([]);
  const [napDetails, setNapDetails] = useState('');

  // Obtener los bebés y su último registro de siesta
  useEffect(() => {
    const fetchBabies = async () => {
      const res = await fetch('/api/get-babies-with-last-nap');
      if (res.ok) {
        const data = await res.json();
        setBabies(data);
      } else {
        console.error('Error al obtener los bebés');
      }
    };

    fetchBabies();
  }, []);

  // Función para manejar el registro de la siesta
  const handleRegisterNap = async (babyId) => {
    if (!napDetails) {
      alert('Por favor, ingresa los detalles de la siesta');
      return;
    }

    const res = await fetch('/api/register-nap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ babyId, napDetails }),
    });

    if (res.ok) {
      const data = await res.json();
      alert(data.message);  // Mostrar mensaje de éxito
      setBabies((prevBabies) =>
        prevBabies.map((baby) =>
          baby.id === babyId
            ? { ...baby, activities: [{ details: napDetails, timestamp: new Date() }] }
            : baby
        )
      );
      setNapDetails('');  // Limpiar el campo de detalles
    } else {
      const errorData = await res.json();
      alert(errorData.error);  // Mostrar mensaje de error
    }
  };

  return (
    <div className="container">
      <h1>Registrar Siesta</h1>
      <div>
        {babies.map((baby) => (
          <div key={baby.id} className="baby-item">
            <span>{baby.name} - {new Date(baby.birthDate).toLocaleDateString()}</span>
            <div>
              <input
                type="text"
                value={napDetails}
                onChange={(e) => setNapDetails(e.target.value)}
                placeholder="Detalles de la siesta"
              />
              <button
                onClick={() => handleRegisterNap(baby.id)}
                className="register-nap-btn"
              >
                Registrar Siesta
              </button>
            </div>
            {baby.activities.length > 0 && (
              <p>Última siesta: {new Date(baby.activities[0].timestamp).toLocaleString()}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
