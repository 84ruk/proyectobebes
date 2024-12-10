// src/app/activity-history/page.js
'use client';
// src/app/activity-history/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ActivityHistory() {
  const [activities, setActivities] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Obtener historial de actividades
    async function fetchActivities() {
      try {
        const response = await fetch('/api/activity-history');
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error('Error al obtener el historial:', error);
      }
    }

    fetchActivities();
  }, []);

  const handleViewActivity = (activityId) => {
    router.push(`/activity/${activityId}`);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Historial de Actividades</h1>
      <div className="space-y-4">
        {activities.length === 0 ? (
          <p>No hay actividades registradas.</p>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="p-4 bg-white shadow rounded-lg">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{activity.baby.name}</h2>
                <span className="text-gray-500">
                  {new Date(activity.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-700 mt-2">Tipo: {activity.type}</p>
              <p className="text-gray-600">Detalles: {activity.details || 'No hay detalles'}</p>
              <button
                onClick={() => handleViewActivity(activity.id)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Ver detalles
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
