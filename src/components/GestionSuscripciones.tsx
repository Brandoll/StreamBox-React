import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormularioGenerico from './FormularioGenerico';
import TablaGenerica from './TablaGenerica';
import { Suscripcion } from '../types';

interface Cliente {
  id: number;
  nombre: string;
}

interface Plataforma {
  id: number;
  nombre: string;
}

const GestionSuscripciones: React.FC = () => {
  const [suscripciones, setSuscripciones] = useState<Suscripcion[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [plataformas, setPlataformas] = useState<Plataforma[]>([]);
  const [editData, setEditData] = useState<Suscripcion | null>(null);

  useEffect(() => {
    fetchSuscripciones();
    fetchClientes();
    fetchPlataformas();
  }, []);

  const fetchSuscripciones = async () => {
    try {
      const response = await axios.get('/api/suscripciones');
      const transformedData = response.data.map((suscripcion: any) => ({
        ...suscripcion,
        clienteId: suscripcion.cliente?.id || '',
        clienteNombre: `${suscripcion.cliente?.nombre || 'N/A'}`,
        plataformaId: suscripcion.cuentaPlataforma?.id || '',
        plataformaNombre: suscripcion.cuentaPlataforma?.plataforma?.nombre || 'N/A',
      }));
      setSuscripciones(transformedData);
    } catch (error) {
      console.error('Error al obtener suscripciones:', error);
    }
  };

  const fetchClientes = async () => {
    try {
      const response = await axios.get('/api/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
    }
  };

  const fetchPlataformas = async () => {
    try {
      const response = await axios.get('/api/plataformas');
      setPlataformas(response.data);
    } catch (error) {
      console.error('Error al obtener plataformas:', error);
    }
  };

  const handleCreateOrUpdate = async (data: Omit<Suscripcion, 'id'>) => {
    try {
      const payload = {
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin,
        fechaPago: data.fechaPago,
        estado: data.estado,
        monto: data.monto,
        descuento: data.descuento,
        metodoPago: data.metodoPago,
        observaciones: data.observaciones,
        cliente: { id: data.clienteId },
        cuentaPlataforma: { id: data.plataformaId },
      };
      if (editData) {
        await axios.put(`/api/suscripciones/${editData.id}`, payload);
      } else {
        await axios.post('/api/suscripciones', payload);
      }
      setEditData(null);
      fetchSuscripciones();
    } catch (error) {
      console.error('Error al guardar suscripción:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/suscripciones/${id}`);
      fetchSuscripciones();
    } catch (error) {
      console.error('Error al eliminar suscripción:', error);
    }
  };

  return (
    <div>
      <h2>Gestión de Suscripciones</h2>
      <FormularioGenerico<Suscripcion>
        onSubmit={handleCreateOrUpdate}
        initialData={editData || undefined}
        fields={[
          {
            label: 'Cliente',
            key: 'clienteId',
            type: 'select',
            options: clientes.map((cliente) => ({
              label: cliente.nombre,
              value: cliente.id.toString(),
            })),
          },
          {
            label: 'Plataforma',
            key: 'plataformaId',
            type: 'select',
            options: plataformas.map((plataforma) => ({
              label: plataforma.nombre,
              value: plataforma.id.toString(),
            })),
          },
          { label: 'Fecha de Inicio', key: 'fechaInicio', type: 'date' },
          { label: 'Fecha de Fin', key: 'fechaFin', type: 'date' },
          { label: 'Fecha de Pago', key: 'fechaPago', type: 'date' },

          {
            label: 'Estado',
            key: 'estado',
            type: 'select',
            options: [
              { label: 'Activo', value: 'Activo' },
              { label: 'Inactivo', value: 'Inactivo' },
              { label: 'Cancelado', value: 'Cancelado' },
            ],
          },
          { label: 'Monto', key: 'monto', type: 'number' },
          { label: 'Descuento', key: 'descuento', type: 'number' },
          {
            label: 'Método de Pago',
            key: 'metodoPago',
            type: 'select',
            options: [
              { label: 'Paypal', value: 'Paypal' },
              { label: 'Yape', value: 'Yape' },
              { label: 'Tarjeta', value: 'Tarjeta' },
              { label: 'Efectivo', value: 'Efectivo' },
            ],
          },
          { label: 'Observaciones', key: 'observaciones', type: 'textarea' },
        ]}
        onCancel={() => setEditData(null)}
      />
      <TablaGenerica<Suscripcion>
        data={suscripciones}
        columns={[
          { label: 'ID', key: 'id' },
          { label: 'Cliente', key: 'clienteNombre' },
          { label: 'Plataforma', key: 'plataformaNombre' },
          { label: 'Fecha de Inicio', key: 'fechaInicio' },
          { label: 'Fecha de Fin', key: 'fechaFin' },
          { label: 'Fecha de Pago', key: 'fechaPago' },
          { label: 'Estado', key: 'estado' },
          { label: 'Monto', key: 'monto' },
          { label: 'Descuento', key: 'descuento' },
          { label: 'Método de Pago', key: 'metodoPago' },
        ]}
        onEdit={(item) => setEditData(item)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default GestionSuscripciones;
