import axios from 'axios'
import { JwtService } from './JwtService'

class ApiService {
  static init() {
    // Configurar la URL base desde las variables de entorno
    axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;
    
    // Configurar interceptor para el token JWT
    axios.interceptors.request.use(config => {
      const token = JwtService.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      config.headers.Accept = 'application/vnd.api+json';
      config.headers['Content-Type'] = 'application/vnd.api+json';
      return config;
    });
  }

  static query(resource, params) {
    return axios.get(resource, params);
  }

  static get(resource) {
    return axios.get(`${resource}`);
  }

  static post(resource, params, config = {}) {
    return axios.post(resource, params, config);
  }

  static update(resource, slug, params) {
    return axios.put(`${resource}/${slug}`, params);
  }

  static put(resource, params, config = {}) {
    return axios.put(resource, params, config);
  }

  static patch(resource, params, config = {}) {
    return axios.patch(resource, params, config);
  }

  static delete(resource, config = {}) {
    return axios.delete(resource, config);
  }
}

// Inicializar inmediatamente al importar
ApiService.init();

export { ApiService };