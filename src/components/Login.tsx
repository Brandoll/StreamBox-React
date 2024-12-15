import React, { useState } from 'react';
import axios from 'axios';  // Importamos axios
import '../Login.css';

const Login = ({ onLogin }: { onLogin: (username: string, password: string) => void }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');  // Estado para mensajes de error

    // Función para manejar el submit del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Realizamos la solicitud a la API para obtener los usuarios
            const response = await axios.get('http://localhost:8080/api/usuarios');
            const usuarios = response.data;

            // Buscamos si el usuario con las credenciales ingresadas existe
            const usuario = usuarios.find((user: { username: string; password: string }) => user.username === username && user.password === password);

            if (usuario) {
                // Si el usuario existe y las credenciales coinciden
                onLogin(username, password);  // Llamamos al callback onLogin
            } else {
                // Si no se encuentra el usuario o las credenciales no coinciden
                setErrorMessage('Credenciales incorrectas');
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setErrorMessage('Error de conexión con el servidor');
        }
    };

    return (
            <div className="login-form">
                <div className="form-content">
                    <div className="logo">
                        <img src="https://raw.githubusercontent.com/Brandoll/dwi-s7/refs/heads/main/1.2.png" alt="StreamBox Logo" />
                    </div>
                    <h2>Iniciar sesión</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label></label>
                            <input
                                type="text"
                                placeholder="Usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label></label>
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Iniciar sesión</button>
                    </form>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}  {/* Muestra el mensaje de error si existe */}
                </div>
            </div>

    );
};

export default Login;
