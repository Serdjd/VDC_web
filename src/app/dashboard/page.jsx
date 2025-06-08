"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


const fetchPendingUsers = async () => {
    console.log("Fetching pending users from Next.js API Route...");
    const response = await fetch(`/api/users/pending?status=pending`);
    
    if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
};

const validateUser = async (id, isValid) => {
    console.log(`Sending PUT request for user ${id} to Next.js API Route, validate: ${isValid}`);
    try {
        const response = await fetch(`/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ validate: isValid }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(`Error validating user ${id} via Next.js API Route: ${response.status} - ${errorData.message}`);
            throw new Error(errorData.message || `Fallo al validar usuario. Estado: ${response.status}`);
        }

        console.log(`User ${id} validation successful via Next.js API Route.`);
        return true;
    } catch (error) {
        console.error("Error de red o API durante la validación:", error);
        throw error;
    }
};


export default function DashboardPage() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [processingId, setProcessingId] = useState(null);

    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchPendingUsers();
                setUsers(data);
            } catch (err) {
                setError(err.message || 'Fallo al cargar los usuarios.');
                console.error("Fallo al cargar usuarios:", err);
            } finally {
                setLoading(false);
            }
        };
        loadUsers();
    }, []);

    const handleAction = async (id, isValid) => {
        setProcessingId(id);
        setError(null);
        try {
            await validateUser(id, isValid);
            setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        } catch (err) {
            setError(err.message || `La acción sobre el usuario ${id} falló.`);
            console.error(`Error al procesar usuario ${id}:`, err);
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-900 text-white p-8 md:p-12">
            <header className="flex flex-col sm:flex-row justify-between items-center mb-10 md:mb-16">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 sm:mb-0 text-center sm:text-left leading-tight">
                    Gestión de Usuarios Pendientes
                </h1>
                <button
                    onClick={() => router.push('/')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 font-semibold text-lg"
                >
                    &larr; Volver a la Página Principal
                </button>
            </header>

            {loading && (
                <div className="flex flex-col justify-center items-center h-64 text-gray-300">
                    <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="ml-3 text-xl mt-4">Cargando usuarios...</span>
                </div>
            )}

            {error && (
                <div className="bg-red-900 border border-red-700 text-red-300 px-6 py-4 rounded-lg shadow-lg relative mb-8" role="alert">
                    <strong className="font-bold text-lg">¡Error!</strong>
                    <span className="block sm:inline ml-2 text-base">{error}</span>
                </div>
            )}

            {!loading && users.length === 0 && !error && (
                <p className="text-center text-gray-500 text-2xl mt-20">No hay usuarios pendientes de validación en este momento.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {users.map(user => (
                    <div
                        key={user.id}
                        className="bg-neutral-800 p-6 rounded-lg shadow-xl flex flex-col justify-between border border-neutral-700
                                   transform hover:scale-105 transition-transform duration-300 ease-in-out"
                    >
                        <div>
                            <p className="text-gray-300 text-lg md:text-xl font-semibold mb-4">
                                Email: <span className="font-normal text-gray-400 text-base break-all">{user.email}</span>
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-4">
                            <button
                                onClick={() => handleAction(user.id, true)}
                                disabled={processingId === user.id}
                                className={`flex-1 px-4 py-2 rounded-md shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-75 text-lg font-semibold
                                            ${processingId === user.id
                                                ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                                                : 'bg-green-800 text-white hover:bg-green-900 focus:ring-green-500'
                                            }`}
                            >
                                {processingId === user.id ? (
                                    <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    'Validar'
                                )}
                            </button>
                            <button
                                onClick={() => handleAction(user.id, false)}
                                disabled={processingId === user.id}
                                className={`flex-1 px-4 py-2 rounded-md shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-75 text-lg font-semibold
                                            ${processingId === user.id
                                                ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                                                : 'bg-red-800 text-white hover:bg-red-900 focus:ring-red-500'
                                            }`}
                            >
                                {processingId === user.id ? (
                                    <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    'Rechazar'
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}