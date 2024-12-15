# React + TypeScript + Vite | PROYECTO FINAL | UTP

Este proyecto utiliza **React**, **TypeScript**, y **Vite** para proporcionar un entorno de desarrollo rápido y moderno con soporte para HMR (Hot Module Replacement). Se han añadido configuraciones adicionales para **ESLint** con reglas personalizadas y soporte para análisis de tipo con TypeScript, adecuado para aplicaciones en producción.

## Tecnologías utilizadas

- **Vite**: Herramienta de desarrollo rápida para aplicaciones web modernas.
- **React**: Biblioteca para construir interfaces de usuario.
- **TypeScript**: Superset de JavaScript que añade tipado estático.
- **ESLint**: Herramienta para identificar y arreglar problemas en el código.

## Requisitos previos

- Node.js 16 o superior
- npm o yarn para gestionar dependencias

## Configuración inicial

1. Clona el repositorio:
   ```bash
   git clone <URL-del-repositorio>
   cd <nombre-del-proyecto>
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. Accede a la aplicación en tu navegador en [http://localhost:5173](http://localhost:5173).

## Configuración de ESLint

Se ha configurado **ESLint** para que sea compatible con TypeScript y React. Para proyectos en producción, recomendamos activar reglas de análisis de tipos más estrictas.

### Expandiendo la configuración de ESLint

1. Configura la propiedad `parserOptions` en el archivo `eslint.config.js` para habilitar reglas conscientes de tipos:

   ```js
   export default tseslint.config({
     languageOptions: {
       parserOptions: {
         project: ['./tsconfig.node.json', './tsconfig.app.json'],
         tsconfigRootDir: import.meta.dirname,
       },
     },
   });
   ```

2. Reemplaza `tseslint.configs.recommended` con una de las siguientes configuraciones más estrictas según tus necesidades:
   - `tseslint.configs.recommendedTypeChecked`
   - `tseslint.configs.strictTypeChecked`

3. Opcionalmente, añade configuraciones estilísticas:
   ```js
   ...tseslint.configs.stylisticTypeChecked
   ```

4. Instala el plugin de React para ESLint:
   ```bash
   npm install eslint-plugin-react --save-dev
   ```

5. Actualiza el archivo `eslint.config.js` para incluir las configuraciones recomendadas del plugin:
   ```js
   // eslint.config.js
   import react from 'eslint-plugin-react';

   export default tseslint.config({
     settings: { react: { version: '18.3' } },
     plugins: { react },
     rules: {
       ...react.configs.recommended.rules,
       ...react.configs['jsx-runtime'].rules,
     },
   });
   ```

## Scripts disponibles

- `npm run dev`: Inicia el servidor de desarrollo con HMR.
- `npm run build`: Construye la aplicación para producción.
- `npm run lint`: Analiza el código utilizando ESLint.
- `npm run preview`: Previsualiza la aplicación construida para producción.

## Estructura del proyecto

```plaintext
src/
├── assets/          # Recursos estáticos
├── components/      # Componentes reutilizables
├── pages/           # Páginas principales
├── styles/          # Archivos de estilos
├── App.tsx          # Componente principal
├── main.tsx         # Punto de entrada
└── vite-env.d.ts    # Tipos personalizados para Vite
```

## Personalización adicional

- **Vite** permite configurar complementos adicionales en el archivo `vite.config.ts` para adaptar el proyecto a tus necesidades.
- **TypeScript**: Si necesitas configuraciones avanzadas, puedes ajustar `tsconfig.json` según el alcance del proyecto.

## Recursos adicionales

- [Documentación oficial de Vite](https://vitejs.dev/)
- [Guía de React con TypeScript](https://react-typescript-cheatsheet.netlify.app/)
- [Documentación de ESLint](https://eslint.org/docs/latest/)

---

¡Gracias por usar este Proyecto! Si tienes sugerencias o encuentras algún problema, no dudes en abrir un issue.
