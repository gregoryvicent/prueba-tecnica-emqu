# Prueba tecnica EMQU - Gregory Vicent

## Tecnologias usadas:

### Frontend:
- Tailwindcss
- Javascript
- Typescript
- React.js
- React Router Dom
- React Hook Form

### Backend:
- Python
- FastAPI
- SQLite3

## Instalación y puesta en marcha del proyecto:

**Paso 1:** En el repositorio de GitHub del proyecto hacer un git clone del mismo para bajarlo en su máquina local.

**Paso 2:** Una vez se tenga el proyecto ingresar en la carpeta de este, se encontrará con dos carpetas más, el backend y el frontend separados. Para iniciar correctamente el proyecto deberá correr ambas partes.

### Iniciando el Backend:

**Paso 3:** Ingresar en la carpeta llamada **‘backend’** desde su terminal o línea de comandos. Una vez dentro se recomienda iniciar un entorno virtual para instalar las dependencias necesarias únicamente en este proyecto. Para hacer esto ejecute:

```
python3 -m venv venv
```

Tras terminar la ejecución de este comando ingresar en el entorno virtual de las siguientes maneras:

Para linux y MacOS:
```
source venv/bin/activate
```

Para Windows (CMD):
```
<venv>\Scripts\activate.ba
```

**Paso 4:** Estando en su entorno virtual instalar las dependencias necesarias para la ejecución del backend con el comando:

```
pip install -r requirements.txt
```

**Paso 5:** Hacer correr el servidor del backend con el comando:

```
uvicorn main:app
```

El servidor del backend debería estar corriendo sin problemas en el *localhost:8000.*

### Iniciar Frontend:

**Paso 6:** Salir de la carpeta del backend e ingresar en la carpeta **'frontend'**.

**Paso 7:** En terminal ejecutar el siguiente comando para bajar las dependencias necesarias:

```
npm install
```

**Paso 8:** Hacer build de la aplicación con  el comando:

```
npm run build
```

**Paso 9:** Ejecutar la previsualización del proyecto con el comando:

```
npm run preview
```

Con esto el servidor del frontend debería estar corriendo en el *localhost:4173*

**Paso 10**: Ingresar en su navegador web a la dirección: *http://localhost:4173.*

**Paso 11**: Usar alguna de las siguientes credenciales para ingresar por el login de la aplicación:

- User 1:
Email: user1@example.com, 
Password: user1password

- User 2:
Email: user2@example.com, 
Password: user2password

- User 3: 
Email: user3@example.com, 
Password: user3password

## Rutas en la aplicación web:

**/:** Ruta del login

**/machines:** Ruta donde se puede experimentar el CRUD completo de las máquinas que se ingresen.
