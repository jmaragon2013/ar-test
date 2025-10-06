# Lunarie AR Demo

Demo simple de realidad aumentada con acceso a cámara.

## Desplegar en GitHub Pages

1. Sube estos archivos a tu repositorio `video-ar`
2. Ve a Settings > Pages en tu repositorio
3. En "Source", selecciona "Deploy from a branch"
4. Selecciona la rama `main` y la carpeta `/ (root)`
5. Haz clic en "Save"
6. Tu sitio estará disponible en: `https://[tu-usuario].github.io/video-ar/`

## Probar localmente

Simplemente abre el archivo `index.html` en tu navegador.

**Nota:** Para que la cámara funcione en dispositivos móviles, necesitas HTTPS. GitHub Pages proporciona HTTPS automáticamente.

## Estructura

- `index.html` - Página principal con toda la funcionalidad
- `logolunarie.png` - Logo de Lunarie
- `README.md` - Este archivo

## Funcionalidad

1. Pantalla inicial con fondo #ECDFEE y logo centrado
2. Botón "Iniciar AR" (#312731)
3. Al hacer clic, solicita permisos de cámara
4. Muestra el feed de la cámara en pantalla completa
5. Manejo de errores si no se conceden permisos
