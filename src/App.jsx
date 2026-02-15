import React, { useMemo } from 'react';
import GoalCard from './components/GoalCard';
import golesData from './goles.json';

// --- 1. FUNCIONES AUXILIARES (Van afuera para que no estorben) ---

// Convierte "31/01/2026" a fecha real para que la compu entienda
const parseFecha = (fechaStr) => {
  const [dia, mes, anio] = fechaStr.split('/');
  return new Date(anio, mes - 1, dia); // Recuerda: Mes 0 es Enero
};

// Convierte "45+3" a 45.03 para poder ordenar matemáticamente
const parseMinuto = (minutoStr) => {
  const str = String(minutoStr);
  if (str.includes('+')) {
    const [base, extra] = str.split('+');
    // Ejemplo: "45+3" se vuelve 45.03. Así 46 es mayor que 45.03
    return parseInt(base) + (parseInt(extra) / 100);
  }
  return parseInt(str);
};


// --- 2. TU COMPONENTE PRINCIPAL ---

function App() {
  
  // Usamos useMemo: React guardará esta lista ordenada y no la reciclará a menos que cambie el JSON
  const golesOrdenados = useMemo(() => {
    return [...golesData].sort((a, b) => {
      
      // A) PRIMERO: Ordenar por Fecha (Del más nuevo al más viejo)
      const fechaA = parseFecha(a.fecha);
      const fechaB = parseFecha(b.fecha);
      
      // Si las fechas son distintas, gana la fecha más reciente
      if (fechaA.getTime() !== fechaB.getTime()) {
        return fechaB - fechaA; 
      }

      // B) SEGUNDO: Si fue el mismo día, desempatar por Minuto
      // (Para que el gol del min 90 salga arriba del min 10)
      return parseMinuto(b.minuto) - parseMinuto(a.minuto);
    });
  }, []); // El array vacío [] significa "hazlo solo al cargar la página"

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', sans-serif"
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#004D99', marginBottom: '30px' }}>
        Historial de Goles 2026
      </h2>

      {/* CONTENEDOR DE TARJETAS */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        {golesOrdenados.map((gol) => (
          <GoalCard key={gol.id} data={gol} />
        ))}
      </div>
    </div>
  );
}
export default App;