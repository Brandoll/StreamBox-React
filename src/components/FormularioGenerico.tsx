import React, { useState, useEffect } from 'react';
import '../index.css';

interface FormField<T> {
  label: string;
  key: keyof Omit<T, 'id'>;
  type?: string; // Puede ser 'text', 'select', 'checkbox', etc.
  options?: { label: string; value: string }[]; // Solo se usa si type === 'select'
  value?: any; // Valor externo (opcional)
  onChange?: (value: any) => void; // Callback para manejar cambios específicos
  placeholder?: string; // Placeholder adicional
}

interface FormularioGenericoProps<T> {
  onSubmit: (data: Omit<T, 'id'>) => void;
  initialData?: Omit<T, 'id'>;
  fields: FormField<T>[];
  onCancel?: () => void;
}

function FormularioGenerico<T>({
                                 onSubmit,
                                 initialData,
                                 fields,
                               }: FormularioGenericoProps<T>) {
  const [formData, setFormData] = useState<Omit<T, 'id'>>({} as Omit<T, 'id'>);

  useEffect(() => {
    const initial = fields.reduce(
        (acc, field) => ({
          ...acc,
          [field.key]: field.value ?? initialData?.[field.key] ?? '',
        }),
        {} as Omit<T, 'id'>
    );
    setFormData(initial);
  }, [initialData, fields]);

  const handleChange = (key: keyof Omit<T, 'id'>, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
      <form onSubmit={handleSubmit} className="formulario">
        {fields.map(({ label, key, type = 'text', options, value, onChange, placeholder }) => (
            <div key={String(key)} className="form-field">
              <label>{label}:</label>
              {type === 'select' && options ? (
                  <select
                      value={value ?? String(formData[key])}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        handleChange(key, newValue);
                        if (onChange) onChange(newValue);
                      }}
                      required
                  >
                    <option value="" disabled>
                      Selecciona una opción
                    </option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                    ))}
                  </select>
              ) : (
                  <input
                      type={type}
                      value={value ?? String(formData[key])}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        handleChange(key, newValue);
                        if (onChange) onChange(newValue);
                      }}
                      placeholder={placeholder || `Escribe tu ${label.toLowerCase()}`}
                      required
                  />
              )}
            </div>
        ))}
        <div className="form-buttons">
          <button type="submit" className="form-button form-button-submit">
            Guardar
          </button>
        </div>
      </form>
  );
}

export default FormularioGenerico;

