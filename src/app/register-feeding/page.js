'use client'
import { useEffect, useState } from 'react';

export default function RegisterFeedingPage() {
  const [babies, setBabies] = useState([]);
  const [feedingDetails, setFeedingDetails] = useState('');

  useEffect(() => {
    // Obtener los bebés y sus registros de alimentación
    const fetchBabies = async () => {
      const res = await fetch('/api/get-babies-feeding');
      if (res.ok) {
        const data = await res.json();
        setBabies(data);
      } else {
        console.error('Error al obtener los bebés');
      }
    };

    fetchBabies();
  }, []);

  // Función para calcular el tiempo transcurrido
  const timeAgo = (timestamp) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(timestamp)) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) {
      return `Hace ${diffInSeconds} segundo${diffInSeconds > 1 ? 's' : ''}`;
    } else if (diffInMinutes < 60) {
      return `Hace ${diffInMinutes} minuto${diffInMinutes > 1 ? 's' : ''}`;
    } else if (diffInHours < 24) {
      return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    } else {
      return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
    }
  };

  // Función para registrar la alimentación
  const handleRegisterFeeding = async (babyId) => {
    if (!feedingDetails.trim()) {
      alert('Por favor, ingresa los detalles de la alimentación');
      return;
    }

    const res = await fetch('/api/register-feeding', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ babyId, foodDetails: feedingDetails }),
    });

    if (res.ok) {
      const data = await res.json();
      alert(data.message);
      setFeedingDetails('');  // Limpiar el campo de detalles de la alimentación
      // Volver a cargar la lista de bebés
      const updatedRes = await fetch('/api/get-babies-feeding');
      const updatedData = await updatedRes.json();
      setBabies(updatedData);
    } else {
      const errorData = await res.json();
      alert(errorData.error);
    }
  };

  return (
    <div className="container">
      <h1>Registrar Alimentación</h1>
      <ul>
        {babies.map((baby) => (
          <li key={baby.id} className="baby-item">
            <span>{baby.name} - {new Date(baby.birthDate).toLocaleDateString()}</span>
            <div>
              {baby.activities.length > 0 ? (
                <span>
                  Última alimentación: {new Date(baby.activities[0].timestamp).toLocaleString()}<br />
                  <strong>{timeAgo(baby.activities[0].timestamp)}</strong>
                </span>
              ) : (
                <span>No tiene registros de alimentación</span>
              )}
            </div>
            <input
              type="text"
              value={feedingDetails}
              onChange={(e) => setFeedingDetails(e.target.value)}
              placeholder="Detalles de la alimentación"
            />
            <button onClick={() => handleRegisterFeeding(baby.id)} className="register-btn">
              Registrar Alimentación
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
git