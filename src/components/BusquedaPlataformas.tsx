import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';
import '../graficos.css';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const BusquedaPlataformas: React.FC = () => {
  const [plataformas, setPlataformas] = useState<any[]>([]);
  const [filteredPlataformas, setFilteredPlataformas] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const categories = ['música', 'video', 'entretenimiento','Streaming'];

  useEffect(() => {
    fetchPlataformas();
  }, []);

  const fetchPlataformas = async () => {
    try {
      const response = await axios.get('/api/plataformas');
      if (response.data && Array.isArray(response.data)) {
        setPlataformas(response.data);
        setFilteredPlataformas(response.data);
      } else {
        console.error('La API devolvió datos inesperados:', response.data);
      }
    } catch (error) {
      console.error('Error al obtener plataformas:', error);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === '') {
      setFilteredPlataformas(plataformas);
    } else {
      setFilteredPlataformas(
        plataformas.filter((plataforma) => plataforma.categoria === category)
      );
    }
  };

  // Cálculo de datos para gráficos
  const categoriasCantidad = categories.map((category) => ({
    category,
    count: plataformas.filter((plataforma) => plataforma.categoria === category).length,
    totalCost: plataformas
      .filter((plataforma) => plataforma.categoria === category)
      .reduce((sum, plataforma) => sum + (plataforma.costoMensual || 0), 0),
  }));

  const totalPlataformas = plataformas.length;
  const totalCosto = plataformas.reduce(
    (sum, plataforma) => sum + (plataforma.costoMensual || 0),
    0
  );

  // Datos para gráficos
  const dataCategorias = {
    labels: categoriasCantidad.map((item) => item.category),
    datasets: [
      {
        label: 'Cantidad de plataformas por categoría',
        data: categoriasCantidad.map((item) => item.count),
        backgroundColor: ['#4CAF50', '#2196F3', '#FF5722','#ebff00'],
      },
    ],
  };

  const dataPieChart = {
    labels: categoriasCantidad.map((item) => item.category),
    datasets: [
      {
        label: 'Porcentaje del costo mensual por categoría',
        data: categoriasCantidad.map((item) =>
          totalCosto > 0 ? ((item.totalCost / totalCosto) * 100).toFixed(2) : 0
        ),
        backgroundColor: ['#4CAF50', '#2196F3', '#FF5722','#ebff00'],
        hoverOffset: 10,
      },
    ],
  };

  return (
    <div className='contentbusqueda'>
      <h2>Búsqueda de Plataformas por Categoría</h2>
      <div className="form-field">
        <label htmlFor="category">Seleccionar categoría:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="form-input"
        >
          <option value="">Todas las categorías</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <table className="tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>URL Oficial</th>
            <th>Costo Mensual</th>
            <th>Categoría</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlataformas.map((plataforma, index) => (
            <tr key={plataforma.id || index}>
              <td>{plataforma.id || 'N/A'}</td>
              <td>{plataforma.nombre || 'N/A'}</td>
              <td>{plataforma.descripcion || 'N/A'}</td>
              <td>{plataforma.urlOficial || 'N/A'}</td>
              <td className="costo">
                {plataforma.costoMensual !== undefined
                  ? `$${plataforma.costoMensual.toFixed(2)}`
                  : 'N/A'}
              </td>
              <td className="categoria">{plataforma.categoria || 'Sin categoría'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Contenedor independiente de gráficos */}
      <div className="graficos-container-externo">
        <div className="grafico-bar-container">
          <h3>Gráfico: Plataformas por Categoría</h3>
          <Bar data={dataCategorias} />
        </div>
        <div className="grafico-pie-container">
          <h3>Gráfico: Costo Mensual por Categoría (%)</h3>
          <Pie data={dataPieChart} />
        </div>
      </div>
    </div>
  );
};

export default BusquedaPlataformas;
