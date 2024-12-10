onmessage = function (e) {
    const { timestamp } = e.data;
  
    // Simula un cálculo pesado, como convertir el timestamp en un formato más amigable
    const lastFeedingTime = new Date(timestamp).toLocaleString();
  
    // Envía el resultado de vuelta al hilo principal
    postMessage(lastFeedingTime);
  }
  