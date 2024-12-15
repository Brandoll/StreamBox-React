import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormularioGenerico from './FormularioGenerico';
import TablaGenerica from './TablaGenerica';
import { CuentaPlataforma } from '../types';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

interface Plataforma {
  id: number;
  nombre: string;
}

const GestionCuentasPlataforma: React.FC = () => {
  const [cuentas, setCuentas] = useState<CuentaPlataforma[]>([]);
  const [plataformas, setPlataformas] = useState<Plataforma[]>([]);
  const [editData, setEditData] = useState<CuentaPlataforma | null>(null);

  // Datos para los gráficos
  const [chartDataPie, setChartDataPie] = useState<any>(null);
  const [chartDataBar, setChartDataBar] = useState<any>(null);

  useEffect(() => {
    fetchCuentas();
    fetchPlataformas();
  }, []);

  // Obtener cuentas con información completa
  const fetchCuentas = async () => {
    try {
      const response = await axios.get('/api/cuentas-plataforma');
      const transformedData = response.data.map((cuenta: any) => ({
        ...cuenta,
        plataformaId: cuenta.plataforma?.id || '',
        plataforma: cuenta.plataforma, // Mantener relación completa
      }));
      setCuentas(transformedData);
      prepareChartData(transformedData); // Generar datos para gráficos
    } catch (error) {
      console.error('Error al obtener cuentas de plataforma:', error);
      alert('No se pudo cargar la lista de cuentas.');
    }
  };

  // Obtener lista de plataformas
  const fetchPlataformas = async () => {
    try {
      const response = await axios.get('/api/plataformas');
      setPlataformas(response.data);
    } catch (error) {
      console.error('Error al obtener plataformas:', error);
      alert('No se pudo cargar la lista de plataformas.');
    }
  };

  // Preparar datos para gráficos
  const prepareChartData = (cuentas: CuentaPlataforma[]) => {
    // Datos para gráfico de pastel
    const countsByPlataforma: Record<string, number> = {};
    cuentas.forEach((cuenta) => {
      const plataformaNombre = cuenta.plataforma?.nombre || 'Desconocida';
      countsByPlataforma[plataformaNombre] = (countsByPlataforma[plataformaNombre] || 0) + 1;
    });

    const pieLabels = Object.keys(countsByPlataforma);
    const pieData = Object.values(countsByPlataforma);

    setChartDataPie({
      labels: pieLabels,
      datasets: [
        {
          label: 'Cuentas por Plataforma',
          data: pieData,
          backgroundColor: ['#4CAF50', '#2196F3', '#FF5722', '#FFC107', '#9C27B0'],
          hoverOffset: 10,
        },
      ],
    });

    // Datos para gráfico de barras
    const barData = Object.values(countsByPlataforma);

    setChartDataBar({
      labels: pieLabels,
      datasets: [
        {
          label: 'Cantidad de Plataformas',
          data: barData,
          backgroundColor: '#2196F3',
        },
      ],
    });
  };

  // Manejar creación o actualización de cuentas
  const handleCreateOrUpdate = async (data: Omit<CuentaPlataforma, 'id'>) => {
    try {
      if (!data.plataformaId) {
        alert('Por favor, selecciona una plataforma válida.');
        return;
      }
      const payload = {
        ...data,
        plataforma: { id: data.plataformaId }, // Usar el ID para la relación
      };
      if (editData) {
        await axios.put(`/api/cuentas-plataforma/${editData.id}`, payload);
      } else {
        await axios.post('/api/cuentas-plataforma', payload);
      }
      setEditData(null);
      fetchCuentas();
    } catch (error) {
      console.error('Error al guardar cuenta de plataforma:', error);
      alert('Error al guardar cuenta de plataforma.');
    }
  };

  return (
    <>
      {/* Contenedor principal */}
      <div className='contenidoplataforma'>
        <h2>Gestión de Cuentas de Plataforma</h2>
        <FormularioGenerico<CuentaPlataforma>
          onSubmit={handleCreateOrUpdate}
          initialData={editData || undefined}
          fields={[
            { label: 'Correo', key: 'correo' },
            { label: 'Contraseña', key: 'contraseña', type: 'password' },
            {
              label: 'Estado',
              key: 'estado',
              type: 'select',
              options: [
                { label: 'Activo', value: 'Activo' },
                { label: 'Inactivo', value: 'Inactivo' },
              ],
            },
            { label: 'Observaciones', key: 'observaciones' },
            {
              label: 'Plataforma',
              key: 'plataformaId',
              type: 'select',
              options: plataformas.map((plataforma) => ({
                label: plataforma.nombre,
                value: plataforma.id.toString(),
              })),
            },
          ]}
          onCancel={() => setEditData(null)}
        />
        <TablaGenerica<CuentaPlataforma>
          data={cuentas}
          columns={[
            { label: 'ID', key: 'id' },
            { label: 'Correo', key: 'correo' },
            { label: 'Estado', key: 'estado' },
            { label: 'Observaciones', key: 'observaciones' },
            {
              label: 'Plataforma',
              key: 'plataformaId',
              render: (item) => item.plataforma?.nombre || 'N/A', // Mostrar el nombre
            },
          ]}
          onEdit={(item) => setEditData(item)}
          onDelete={async (id: number) => {
            await axios.delete(`/api/cuentas-plataforma/${id}`);
            fetchCuentas();
          }}
        />
      </div>

      {/* Contenedor independiente para gráficos */}
      <div className='graficos-container'>
        {/* Gráfico de pastel */}
        {chartDataPie && (
          <div className="grafico">
            <h3>Cuentas por Plataforma</h3>
            <Pie data={chartDataPie} />
          </div>
        )}

        {/* Gráfico de barras */}
        {chartDataBar && (
          <div className="grafico2">
            <h3>Cantidad de Plataformas</h3>
            <Bar data={chartDataBar} />
          </div>
        )}
      </div>
    </>
  );
};

export default GestionCuentasPlataforma;
