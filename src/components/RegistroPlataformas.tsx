import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';

const RegistroPlataformas: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    urlOficial: '',
    costoMensual: '',
    categoria: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        costoMensual: parseFloat(formData.costoMensual), // Convertir a número
      };
      await axios.post('/api/plataformas', payload);
      alert('Plataforma registrada exitosamente');
      setFormData({
        nombre: '',
        descripcion: '',
        urlOficial: '',
        costoMensual: '',
        categoria: '',
      });
    } catch (error) {
      console.error('Error al registrar la plataforma:', error);
      alert('Hubo un error al registrar la plataforma.');
    }
  };

  return (
      <div className="registro-container">
        <h2 className="titulo">Registro de Plataformas</h2>
        <form onSubmit={handleSubmit} className="formulario">
          <div className="form-field">
            <label>Nombre:</label>
            <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Escribe el nombre"
                required
            />
          </div>
          <div className="form-field">
            <label>Descripción:</label>
            <input
                type="text"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                placeholder="Escribe una descripción"
            />
          </div>
          <div className="form-field">
            <label>URL Oficial:</label>
            <input
                type="url"
                name="urlOficial"
                value={formData.urlOficial}
                onChange={handleInputChange}
                placeholder="Ej. https://www.example.com"
                required
            />
          </div>
          <div className="form-field">
            <label>Costo Mensual:</label>
            <input
                type="number"
                step="0.01"
                name="costoMensual"
                value={formData.costoMensual}
                onChange={handleInputChange}
                placeholder="Ingresa el costo mensual"
                required
            />
          </div>
          <div className="form-field">
            <label>Categoría:</label>
            <select
                name="categoria"
                value={formData.categoria}
                onChange={handleInputChange}
                required
            >
              <option value="">Selecciona una categoría</option>
              <option value="música">Música</option>
              <option value="video">Video</option>
              <option value="entretenimiento">Entretenimiento</option>
            </select>
          </div>
          <button type="submit" className="form-button form-button-submit">
            Registrar
          </button>
        </form>
      </div>
  );
};

export default RegistroPlataformas;


