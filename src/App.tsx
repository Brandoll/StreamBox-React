import React, { useState } from 'react';
import './index.css';
import avatarImage from './assets/Imagen Admin.jpg'; // Imagen local
import { FaTv, FaSearch, FaUser, FaCogs, FaRegCreditCard } from 'react-icons/fa'; // Íconos
import RegistroPlataformas from './components/RegistroPlataformas';
import GestionClientes from './components/GestionClientes';
import GestionCuentasPlataforma from './components/GestionCuentasPlataforma';
import GestionSuscripciones from './components/GestionSuscripciones';
import BusquedaPlataformas from './components/BusquedaPlataformas';
import Login from './components/Login.tsx';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);  // Estado para controlar si el usuario está autenticado
    const [view, setView] = useState<'plataformas' | 'clientes' | 'cuentas' | 'suscripciones' | 'busqueda'>('plataformas');

    // Función de autenticación que recibe el nombre de usuario desde Login
    const handleLogin = () => {
        setIsAuthenticated(true);  // Si las credenciales son correctas, el usuario está autenticado
    };

    return (
        <div className="login-container">
            {!isAuthenticated ? (
                // Si no está autenticado, mostramos el formulario de Login
                <div className="login-container">
                    <Login onLogin={handleLogin} />
                </div>
            ) : (
                // Si está autenticado, mostramos la barra lateral y la vista principal
                <>
                    <aside className="sidebar">
                        {/* Header con avatar y título */}
                        <div className="sidebar-header">
                            <img
                                src={avatarImage}
                                alt="Avatar"
                                className="sidebar-avatar"
                            />
                            <div className="sidebar-title">
                                <h2 className="sidebar-title-text">
                                    <span className="streambox">Stream</span>
                                    <span className="box">Box</span>
                                </h2>
                            </div>
                        </div>

                        {/* Menú */}
                        <nav
                            className="menu"
                            style={{
                                '--active-index': ['plataformas', 'busqueda', 'clientes', 'cuentas', 'suscripciones'].indexOf(view),
                            } as React.CSSProperties}
                        >
                            <button
                                onClick={() => setView('plataformas')}
                                className={view === 'plataformas' ? 'menu-item active' : 'menu-item'}
                            >
                                <FaTv className="menu-icon" />
                                Plataformas
                            </button>
                            <button
                                onClick={() => setView('busqueda')}
                                className={view === 'busqueda' ? 'menu-item active' : 'menu-item'}
                            >
                                <FaSearch className="menu-icon" />
                                Búsqueda de Plataformas
                            </button>
                            <button
                                onClick={() => setView('clientes')}
                                className={view === 'clientes' ? 'menu-item active' : 'menu-item'}
                            >
                                <FaUser className="menu-icon" />
                                Clientes
                            </button>
                            <button
                                onClick={() => setView('cuentas')}
                                className={view === 'cuentas' ? 'menu-item active' : 'menu-item'}
                            >
                                <FaRegCreditCard className="menu-icon" />
                                Cuentas de Plataforma
                            </button>
                            <button
                                onClick={() => setView('suscripciones')}
                                className={view === 'suscripciones' ? 'menu-item active' : 'menu-item'}
                            >
                                <FaCogs className="menu-icon" />
                                Suscripciones
                            </button>
                        </nav>
                    </aside>

                    {/* Contenido Principal */}
                    <main className="content">
                        {view === 'plataformas' && <RegistroPlataformas />}
                        {view === 'busqueda' && <BusquedaPlataformas />}
                        {view === 'clientes' && <GestionClientes />}
                        {view === 'cuentas' && <GestionCuentasPlataforma />}
                        {view === 'suscripciones' && <GestionSuscripciones />}
                    </main>
                </>
            )}
        </div>
    );
};

export default App;
