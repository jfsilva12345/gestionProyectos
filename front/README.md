# Neotech react app
## para construir la imagen.
docker build -t username/neotech-react-app .
## para ejecutar la imagen.
docker run --rm -v ${PWD}:/app -v /app/node_modules -p 3000:3000 -d username/neotech-react-app