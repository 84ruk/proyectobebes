'use client'

import Link from 'next/link'
import Image from 'next/image'
import tutorialImage from './imagen.png' // Ruta a la imagen subida

export default function Recommendations() {
  return (
    <div className="full-screen">
      <header className="header">
        <h1>Recomendaciones de Cuidado para tu Bebé</h1>
        <p>Aquí tienes información básica sobre los cuidados de un bebé, específicamente cómo cambiar un pañal y las horas recomendadas para alimentarlo.</p>
      </header>

      <main className="w-full items-center justify-center">
        <section className="recommendation-section">
          <h2>1. Cómo cambiar un pañal</h2>
          <p>Cambiar un pañal es una tarea sencilla si sigues estos pasos:</p>
          <ul>
            <li><strong>Prepara todo lo necesario:</strong> Pañales limpios, Toallitas húmedas (sin alcohol, especialmente diseñadas para bebés), Crema para prevenir rozaduras (opcional), Un cambiador limpio.</li>
            <li><strong>Acomoda al bebé:</strong> Colócalo sobre una superficie plana y segura, como un cambiador o una cama con una toalla. Nunca lo dejes sin supervisión.</li>
            <li><strong>Retira el pañal sucio:</strong> Despega las tiras adhesivas y dobla la parte frontal del pañal hacia abajo. Limpia al bebé con las toallitas húmedas, siempre de adelante hacia atrás para evitar infecciones (especialmente en niñas).</li>
            <li><strong>Coloca el pañal limpio:</strong> Desliza el nuevo pañal debajo del bebé, asegurándote de que la parte posterior quede más alta que la frontal. Ajusta las tiras adhesivas sin apretar demasiado.</li>
            <li><strong>Desecha el pañal sucio:</strong> Envuelve el pañal usado y colócalo en un contenedor adecuado.</li>
            <li><strong>Lávate las manos:</strong> Esto previene la propagación de gérmenes.</li>
          </ul>
          <p>Para más detalles, visita el tutorial completo sobre <Link href="/tutorial-cambiar-panial" className="tutorial-link">cómo cambiar un pañal</Link>.</p>
          
          <Image src={tutorialImage} alt="Instrucciones para cambiar un pañal" width={600} height={400} />
        </section>

        <section className="feeding-schedule">
          <h2>2. Horarios recomendados para alimentar a un bebé</h2>
          <p>Los horarios varían según la edad del bebé:</p>
          <h3>Recién nacidos (0-3 meses):</h3>
          <ul>
            <li><strong>Frecuencia:</strong> Cada 2-3 horas (8-12 tomas al día).</li>
            <li><strong>Tipo de alimentación:</strong> Leche materna: A demanda, cuando el bebé lo pida. Fórmula: 60-120 ml por toma.</li>
          </ul>

          <h3>Bebés de 4-6 meses:</h3>
          <ul>
            <li><strong>Frecuencia:</strong> Cada 3-4 horas (6-8 tomas al día).</li>
            <li><strong>Introducción de sólidos:</strong> Puede empezar alrededor de los 6 meses, siempre con indicación del pediatra.</li>
          </ul>

          <h3>Bebés de 7-12 meses:</h3>
          <ul>
            <li><strong>Frecuencia:</strong> Leche (materna o fórmula): 3-4 veces al día. Alimentos sólidos: 2-3 comidas al día con refrigerios ligeros.</li>
          </ul>

          <h4>Consideraciones importantes:</h4>
          <ul>
            <li>Cada bebé es diferente; escucha sus señales de hambre.</li>
            <li>Evita forzarlo a comer.</li>
            <li>Consulta al pediatra para adaptar la alimentación según sus necesidades específicas.</li>
          </ul>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2024 Cuidado de Bebés.</p>
      </footer>
    </div>
  )
}
