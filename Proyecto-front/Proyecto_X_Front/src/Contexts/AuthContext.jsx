import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            console.log('URL actual:', window.location.search); // Usar window.location.search
            try {
                const params = new URLSearchParams(window.location.search);
                const token = params.get('token');
                const username = params.get('username');
                const email = params.get('email');
                const photo = params.get('photo');
                const ID = params.get('FacebookId') || params.get('GoogleId');

                console.log('Datos obtenidos de la URL:');
                console.log(`Token: ${token}`);
                console.log(`Username: ${username}`);
                console.log(`Email: ${email}`);
                console.log(`Photo: ${photo}`);
                console.log(`ID: ${ID}`);

                if (token && username && email && photo && ID) {
                    setAuthUser({ token, username, email, photo, ID });
                    localStorage.setItem('token', token); // Guardar token en localStorage
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                } else {
                    console.log('No se encontraron todos los datos necesarios en la URL');
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const authLogin = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3000/auth/login', { email, password });
            const { user, token } = response.data;

            console.log('Datos obtenidos del login local:');
            console.log(`Token: ${token}`);
            console.log(`Username: ${user.username}`);
            console.log(`Email: ${user.email}`);
            console.log(`Photo: ${user.photo}`);
            console.log(`ID: ${user.ID}`);

            if (token && user) {
                setAuthUser(user);
                localStorage.setItem('token', token);
                localStorage.setItem('username', user.username);
                localStorage.setItem('email', user.email);
                localStorage.setItem('photo', user.photo);
                localStorage.setItem('ID', user.ID);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                return { success: true };
            } else {
                console.log('No se obtuvo el token o el usuario');
                return { success: false, message: 'No se obtuvo el token o el usuario' };
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                return { success: false, message: 'Credenciales inválidas' };
            } else {
                return { success: false, message: 'Error en el login' };
            }
        }
    };

    const authRegister = async (username, email, password) => {
        try {
            const response = await axios.post('http://localhost:3000/auth/register', { username, email, password });
            const { user, token } = response.data;

            console.log('Datos obtenidos del registro:');
            console.log(`Token: ${token}`);
            console.log(`Username: ${user.username}`);
            console.log(`Email: ${user.email}`);
            console.log(`Photo: ${user.photo}`);
            console.log(`ID: ${user.ID}`);

            if (token && user) {
                return { success: true };
            } else {
                return { success: false, message: 'No se obtuvo el token o el usuario' };
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                return { success: false, message: error.response.data.message || 'Error en el registro' };
            } else {
                return { success: false, message: 'Error en el registro' };
            }
        }
    };

    const authLogout = () => {
        console.log('Deslogueando usuario...');
        setAuthUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('photo');
        localStorage.removeItem('ID');
        delete axios.defaults.headers.common['Authorization'];
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, authLogin, authRegister, authLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Crear y exportar el hook useAuthContext
export const useAuthContext = () => useContext(AuthContext);
