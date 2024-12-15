export interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string; 
  tipoDocumento?: string;
  numeroDocumento?: string; 
  observaciones?: string; 
}

export interface Plataforma {
  id: number;
  nombre: string;
  descripcion: string;
  stock: number;
  categoria: string; // Por ejemplo: "Películas", "Series"
}

export interface CuentaPlataforma {
  id: number;
  correo: string;
  contraseña: string;
  estado: string;
  observaciones?: string;
  plataformaId: number; // Relación obligatoria
  plataforma?: {        // Información adicional para mostrar nombre
    id: number;
    nombre: string;
  };
}

export interface Suscripcion {
  id: number;
  clienteId: number;
  clienteNombre?: string;
  plataformaId: number;
  plataformaNombre?: string;
  fechaInicio: string;
  fechaFin: string;
  fechaPago?: string; // ISO Format (YYYY-MM-DD)
  estado: string;
  monto: number;
  descuento?: number;
  metodoPago: string;
  numeroUsuarios: number;
  renovacionAutomatica: boolean;
  observaciones?: string;
}

export interface Usuario {
id: number;
nombre: string;
apellido: string;
email: string;
contrasena: string;
rol: 'admin' | 'usuario';
}

