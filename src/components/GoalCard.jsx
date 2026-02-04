import './GoalCard.css';

const GoalCard = ({ data }) => {
  const getTag = () => {
    if (data.tipo === 'PENAL') return ' (P)';
    if (data.tipo === 'AUTOGOL') return ' (GEC)';
    return '';
  };

  return (
    <div className="goal-card">
      {/* Lado Izquierdo: Foto + Dorsal */}
      <div className="card-photo">
        <img src={data.foto} alt={data.nombre} />
        
        {/* El Triángulo con el número */}
        <div className="dorsal-tag">
          <span>{data.dorsal}</span>
        </div>
      </div>

      <div className="card-content">
        <div className="card-header">
          <h3>{data.nombre}{getTag()}</h3>
          <span className="minute">{data.minuto}'</span>
        </div>
        
        <div className="card-details">
          {data.asistio && (
            <p className="assist-row">
              <strong>Asistió:</strong> {data.asistio}
            </p>
          )}

          <p><strong>Partido:</strong> {data.partido}</p>
          <p><strong>Estadio:</strong> {data.estadio}</p>
          <p><strong>Competencia:</strong> {data.competencia}</p>
          {/* Agregamos la etiqueta "Fecha:" para uniformidad */}
          <p className="date"><strong>Fecha:</strong> {data.fecha}</p>
        </div>
      </div>
      
      <div className="card-accent"></div>
    </div>
  );
};

export default GoalCard;