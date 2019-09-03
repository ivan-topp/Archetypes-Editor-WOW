# Editor de Arquetipos Clínicos

Este proyecto tiene como objetivo implementar una plataforma web que permita la vista, carga, descarga, creación, modificación, exportación y guardado en base de datos de arquetipos de salud basados en las estructuras estandarizadas de openEHR, con el fin de funcionar como piezas para la creación de fichas clínicas universales dinámicas.

## Comenzando 🚀

A continuación se describen los Pre-requisitos y la fase de instalación para poder probar este proyecto.


### Pre-requisitos 📋

Primero es necesario tener instalado NodeJS en el equipo, para esto se descarga mediante el sitio web oficial:

[NodeJS](https://nodejs.org/es/).

También es necesario tener instalado MongoDB en el equipo, para esto se descarga mediante el sitio web oficial:

[MongoDB](https://www.mongodb.com/es).

Y se debe tener en ejecución el servidor MongoDB.

### Instalación 🔧

Primero se debe hubicar una consola o terminal en el directorio del proyecto (la aplicación web está en un directorio separado de la aplicación de escritorio), luego se debe acceder por separado a cada directorio y ejecutar el siguiente comando:

```
npm install
```

Luego, para el caso de la **aplicación web** se debe ejecutar el siguiente comando para poner en marcha tanto el servidor de desarrollo de react como el servidor express (NodeJS) que recibe las peticiones de la aplicación web:

```
npm run dev
```

El siguiente comando en la **aplicación web** realiza el traspaso de código en lenguaje jsx a javascript puro mediante webpack:

```
npm run build
```

Este comando posiciona el código de salida en el directorio del cual el servidor Express carga dicho archivo (esto es más que nada para la etapa de producción).

El siguiente comando en la **aplicación web** ejecuta el servidor Express en modo de producción:

```
npm start
```

Ahora para el caso de la **aplicación de escritorio**, se describen los siguientes comandos:

```
npm start
```

Este comando pone en marcha el servidor de desarrollo para el ambiente de ReactJS.

```
npm run build
```

Este comando genera el código javascript puro en base al código ReactJS.

```
npm run electron-dev
```

Este comando es el que ejecuta tanto el entorno de desarrollo de ReactJS como la aplicación ElectronJS.

```
npm run pack
```

Este comando empaqueta la aplicación ElectronJS.

```
npm run dist
```

Finalmente este comando genera el instalador de la apliación ElectronJS.

## Construido con 🛠️

Las herramientas utilizadas en este proyecto son:

* [React](https://es.reactjs.org/) - Librería para Front-End.
* [Ant Design](https://ant.design/) - Framework de Estilado.
* [NodeJS](https://nodejs.org/es/) - Back-End.
* [MongoDB](https://www.mongodb.com/es) - Motor de Base de Datos.
* [ElectronJS](https://electronjs.org) - Aplicación de escritorio multiplataforma (Versión Standalone).

## Documentación 📖

Puedes encontrar mucho más de cómo utilizar este proyecto en nuestra [Documentación](https://ivantopp.github.io/Archetypes-Editor-WOW/)

## Versionado 📌

Usamos [SemVer](http://semver.org/) para el versionado. Para todas las versiones disponibles, mira los [tags en este repositorio](https://github.com/tu/proyecto/tags).

## Autores ✒️

Principalmente el Nombre del equipo de desarrollo es: **WorkOrWate** y sus integrantes son:

* **Iván Topp** - *Líder del Equipo de Desarrollo* - [IvanTopp](https://github.com/IvanTopp)
* **Gonzalo Garrido** - *Desarrollo* - [GonzaloGarrido](https://github.com/GonzaloGarrido)
* **Alejandro Guzmán** - *Desarrollo* - [itsmesonny](https://github.com/ItsmeSonny)

También puedes mirar la lista de todos los [contribuyentes](https://github.com/IvanTopp/Archetypes-Editor-WOW/graphs/contributors) quíenes han participado en este proyecto. 

## Expresiones de Gratitud 🎁

* Al Equipo de desarrollo.
* A CIDLA.
