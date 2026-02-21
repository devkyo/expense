// URL base del backend de Express
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// Helper para construir endpoints fácilmente
export const apiEndpoint = (path: string) => `${API_URL}/api/v1${path}`;
