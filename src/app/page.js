'use client'

import { useState, useEffect } from 'react';
import Link from "next/link";

export default function HomePage() {
  const [name, setName] = useState('');
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);

  // Verificar si ya hay un nombre guardado en las cookies al cargar la página
  useEffect(() => {
    const cookies = document.cookie.split(';');
    const nameCookie = cookies.find(cookie => cookie.trim().startsWith('name='));
    if (nameCookie) {
      setName(nameCookie.split('=')[1]);
      setIsNameSubmitted(true);
    }
  }, []);

  // Manejar el envío del nombre y guardar en cookies
  const handleNameSubmit = (e) => {
    e.preventDefault();
    document.cookie = `name=${name}; path=/; max-age=31536000`; // Guarda por un año
    setIsNameSubmitted(true);
  };

  // Si el nombre ya ha sido ingresado, mostrar la página principal
  if (isNameSubmitted) {
    return (
      <div className="full-screen">
        <header className="header">
          <h1>Bienvenido, {name}!</h1>
          <p>Gestiona el cuidado y seguimiento de las actividades de tu bebé.</p>
        </header>

        <main className="w-full items-center justify-center">
          <div className="link-container">
            <Link className="link-button" href="/add-baby">
              Agregar Bebé
            </Link>
            <Link className="link-button" href="/delete-baby">
              Eliminar Bebé
            </Link>
            <Link className="link-button" href="/register-feeding">
              Registrar Alimentación
            </Link>
            <Link className="link-button" href="/register-diaper-change">
              Registrar Cambio de Pañal
            </Link>
            <Link className="link-button" href="/register-nap">
              Registrar Siesta
            </Link>
            <Link className="link-button" href="/activity-history">
              Historial de Actividades
            </Link>
            {/* Botón de recomendaciones de doctores */}
            <Link className="link-button" href="/recomendaciones">
              Recomendaciones de Doctores
            </Link>
          </div>
        </main>

        <footer className="footer">
          <p>&copy; 2024 Cuidado de Bebés.</p>
        </footer>
      </div>
    );
  }

  // Si el nombre no ha sido ingresado, mostrar el formulario
  return (
    <div className="full-screen">
      <header className="header">
        <h1>Por favor, ingresa tu nombre</h1>
      </header>

      <main className="w-full items-center justify-center">
        <form onSubmit={handleNameSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Escribe tu nombre"
            required
            className="input-field"
          />
          <button type="submit" className="submit-button">Aceptar</button>
        </form>
      </main>
    </div>
  );
}
