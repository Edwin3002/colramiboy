import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "./constants";

// Define la URL base de tu API (reemplaza por tu propia URL de API)

// Crea un `baseQuery` con las configuraciones que necesitas
const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  // extraOptions: { timeout: 30000 }, // Configura el timeout de las peticiones
  prepareHeaders: (headers) => {
    // // Obtiene el token del localStorage si está disponible
    // const token = localStorage.getItem("token");
    // if (token) {
    //   // Si el token existe, lo agrega a los headers de la petición
    //   headers.set("Authorization", `Token ${token}`);
    // }
    return headers;
  },
});

export default baseQuery;
