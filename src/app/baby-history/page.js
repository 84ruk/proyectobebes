// src/app/baby-history/page.js
'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function BabyHistoryPage() {
  const [activities, setActivities] = useState([]);
  const [babyName, setBabyName] = useState('');
  const router = useRouter();
  const { babyId } = router.query;

  useEffect(() => {
    if (babyId) {
      // Obtener el historial de actividades para el bebé
      const fetchActivities = async () => {
        const res = await fetch(`/api/get-baby-activities?babyId=${babyId}`);
        if (res.ok) {
          const data = await res.json();
          setActivities(data);
        } else {
          console.error('Error al obtener las actividades');
        }
      };

      fetchActivities();
    }
  }, [babyId]);

  return (
    <div className="container">
      <h1>Historial de Actividades</h1>
      <h2>{babyName}</h2>
      <div>
        {activities.length === 0 ? (
          <p>No hay actividades registradas.</p>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <p>Tipo: {activity.type}</p>
              <p>Detalles: {activity.details}</p>
              <p>
                Fecha: {new Date(activity.timestamp).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
