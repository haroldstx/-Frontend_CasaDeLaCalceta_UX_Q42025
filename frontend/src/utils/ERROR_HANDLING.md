# Manejo de Errores 500

## Uso del Error Handler

El sistema ahora maneja automáticamente errores 500 del servidor y permite al usuario reintentar.

### Configuración Básica

1. **Importar el helper en tu componente:**

```jsx
import { handleServerError } from '../utils/errorHandler';
import { useNavigate, useLocation } from 'react-router-dom';
```

2. **Usar en peticiones con try/catch:**

```jsx
const MyComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/endpoint');
      // Manejar respuesta exitosa
    } catch (error) {
      // Manejar error 500
      handleServerError(error, navigate, location.pathname);
      
      // Otros errores
      console.error(error);
    }
  };
};
```

3. **Configurar interceptor global de Axios (recomendado):**

En tu archivo principal (App.jsx o main.jsx):

```jsx
import axios from 'axios';
import { createAxiosErrorInterceptor } from './utils/errorHandler';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  // Configurar interceptor una sola vez
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      createAxiosErrorInterceptor(navigate)
    );

    // Limpiar al desmontar
    return () => axios.interceptors.response.eject(interceptor);
  }, [navigate]);

  return <Routes>...</Routes>;
}
```

### Funcionamiento del botón "Volver a cargar"

1. Cuando ocurre un error 500, se guarda la ruta actual en `sessionStorage`
2. El usuario ve la página de error 500
3. Al hacer clic en "Volver a cargar":
   - Se limpia el estado de error
   - Se intenta navegar de vuelta a la ruta anterior
   - Si el servidor ya se recuperó, la página cargará normalmente
   - Si aún hay error, se volverá a mostrar el error 500

### API Reference

#### `handleServerError(error, navigate, currentPath)`
Maneja un error de servidor y navega a la página de error 500.

#### `hasActiveError500()`
Verifica si hay un error 500 activo.

#### `clearError500()`
Limpia el estado de error 500.

#### `createAxiosErrorInterceptor(navigate)`
Crea un interceptor de Axios para manejar errores 500 automáticamente.
