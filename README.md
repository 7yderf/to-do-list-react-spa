# 🚀 Gestor de Tareas - React + Vite

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

Aplicación moderna para gestión de tareas con autenticación JWT, categorías personalizadas y seguimiento de estado de actividades.

## 📋 Tabla de Contenidos
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Tecnologías](#-tecnologías)
- [Variables de Entorno](#-variables-de-entorno)
- [Desarrollo](#-desarrollo)
- [Licencia](#-licencia)

## 📦 Instalación

1. Clonar repositorio:
```bash
git clone https://github.com/7yderf/to-do-list-react-spa
cd to-do-list-react-spa
```

2. Instalar dependencias:
```bash
npm install
```

## ⚙ Configuración

1. Crear archivo `.env`:
```bash
cp .env.example .env
```

2. Configurar variables (editar `.env`):
```env
VITE_APP_API_URL="https://eure-k.com.mx/back/api/v1/"
# VITE_APP_MODE="development"
```

## 🚀 Uso

| Comando           | Acción                          | Puerto       |
|-------------------|---------------------------------|--------------|
| `npm run dev`     | Iniciar servidor de desarrollo  | `localhost:5173` |
| `npm run build`   | Crear build de producción       | `dist/`      |
| `npm run preview` | Previsualizar build             | `localhost:4173` |
| `npm run lint`    | Ejecutar análisis de código     | -            |

## 🗂 Estructura del Proyecto
```
src/
├── assets/
│   ├── images/          # Assets visuales
│   └── sass/           # Estilos globales
│       ├── custom/      # Componentes personalizados
│       └── style.scss   # Estilo principal
├── components/
│   ├── card/            # Componentes de tarjeta
│   ├── form/            # Formularios y validación
│   └── shared/          # Componentes reutilizables
├── core/
│   ├── services/        # Servicios (API, JWT)
│   └── loaders/         # Configuración de rutas
├── hooks/               # Custom hooks
├── layouts/             # Diseños principales
├── router/              # Configuración de enrutamiento
├── stores/              # Gestión de estado (Zustand)
├── views/               # Vistas/páginas
├── App.jsx              # Componente principal
└── main.jsx             # Punto de entrada
```

## 🔧 Tecnologías
- **Frontend**
  - React 19 + Vite
  - React Router 6
  - React Query (Gestión de datos)
  - Zustand (State management)
  - Formik + Yup (Formularios)
  - Bootstrap 5 + Sass

- **Herramientas**
  - Axios (Cliente HTTP)
  - ESLint (Linter)
  - SweetAlert2 (Notificaciones)

## 🌐 Variables de Entorno
| Variable            | Descripción                     | Requerido |
|---------------------|---------------------------------|-----------|
| `VITE_APP_API_URL`  | URL base de la API              | Sí        |
| `VITE_APP_ENV`      | Entorno (dev/prod)              | No        |

## 👨💻 Desarrollo
1. Iniciar servidor de desarrollo:
```bash
npm run dev
```

2. Flujo de trabajo recomendado:
```bash
# Crear nueva rama
git checkout -b feature/nueva-funcionalidad

# Hacer commit de cambios
git add .
git commit -m "descripción clara del cambio"

# Subir cambios
git push origin feature/nueva-funcionalidad
```

## 📄 Licencia
Este proyecto está bajo la licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

---

Desarrollado con ❤️ por Fredy Nazario - [Documentación Completa](docs/)