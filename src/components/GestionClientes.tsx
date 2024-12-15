import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormularioGenerico from './FormularioGenerico';
import TablaGenerica from './TablaGenerica';
import { Cliente } from '../types';

axios.defaults.baseURL = 'http://localhost:8080';

const GestionClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [editData, setEditData] = useState<Cliente | null>(null);

  // Obtener clientes desde el backend
  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await axios.get('/api/clientes');
      console.log(response.data); // Verifica los datos obtenidos
      setClientes(response.data);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
    }
  };

  const handleOnSubmit = async (data: Omit<Cliente, 'id'>) => {
    try {
      if (editData) {
        // Editar cliente existente
        await axios.put(`/api/clientes/${editData.id}`, data);
      } else {
        // Crear nuevo cliente
        await axios.post('/api/clientes', data);
      }
      setEditData(null); // Limpiar datos de edición
      fetchClientes(); // Refrescar lista de clientes
    } catch (error) {
      console.error('Error al guardar cliente:', error);
    }
  };

  const handleOnEdit = (cliente: Cliente) => {
    setEditData(cliente); // Pasa los datos al formulario para edición
  };

  const handleOnDelete = async (id: number) => {
    try {
      await axios.delete(`/api/clientes/${id}`);
      fetchClientes(); // Refrescar lista después de eliminar
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
    }
  };

  return (
    <div>
      <h2>Gestión de Clientes</h2>
      <FormularioGenerico<Cliente>
        onSubmit={handleOnSubmit}
        initialData={editData || undefined}
        fields={[
          { label: 'Nombre', key: 'nombre' },
          { label: 'Apellido', key: 'apellido' },
          { label: 'Correo Electrónico', key: 'email' },
          { label: 'Teléfono', key: 'telefono' },
          {
            label: 'Tipo de Documento',
            key: 'tipoDocumento',
            type: 'select',
            options: [
              { label: 'DNI', value: 'DNI' },
              { label: 'RUC', value: 'RUC' },
            ],
          },
          { label: 'Número de Documento', key: 'numeroDocumento' },
        ]}
        onCancel={() => setEditData(null)}
      />
      <TablaGenerica<Cliente>
        data={clientes}
        columns={[
          { label: 'ID', key: 'id' },
          { label: 'Nombre', key: 'nombre' },
          { label: 'Apellido', key: 'apellido' },
          { label: 'Correo', key: 'email' },
          { label: 'Teléfono', key: 'telefono' },
          { label: 'Tipo de Documento', key: 'tipoDocumento' },
          { label: 'Número de Documento', key: 'numeroDocumento' },
        ]}
        onEdit={handleOnEdit}
        onDelete={handleOnDelete}
      />
    </div>
  );
};

export default GestionClientes;
