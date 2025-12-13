/**
 * Maneja errores de servidor (500) y guarda la ruta actual
 * @param {Error} error - El error capturado
 * @param {function} navigate - Función de navegación de react-router-dom
 * @param {string} currentPath - La ruta actual donde ocurrió el error
 */
export const handleServerError = (error, navigate, currentPath) => {
  // Verificar si es un error 500
  if (error.response && error.response.status === 500) {
    // Guardar la ruta actual en sessionStorage
    sessionStorage.setItem('previousPath', currentPath);
    sessionStorage.setItem('hasError500', 'true');
    
    // Navegar a la página de error 500
    navigate('/error-500', { replace: true });
  }
};

/**
 * Hook para verificar si hay un error 500 activo
 * @returns {boolean} - true si hay un error 500 activo
 */
export const hasActiveError500 = () => {
  return sessionStorage.getItem('hasError500') === 'true';
};

/**
 * Limpia el estado de error 500
 */
export const clearError500 = () => {
  sessionStorage.removeItem('hasError500');
  sessionStorage.removeItem('previousPath');
};

/**
 * Interceptor de Axios para manejar errores 500 automáticamente
 * Usar con axios.interceptors.response
 */
export const createAxiosErrorInterceptor = (navigate) => {
  return (error) => {
    if (error.response && error.response.status === 500) {
      const currentPath = window.location.pathname;
      handleServerError(error, navigate, currentPath);
    }
    return Promise.reject(error);
  };
};
