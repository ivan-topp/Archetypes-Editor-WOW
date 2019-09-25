import React from 'react';
import { Typography } from 'antd';
const { Paragraph, Title, Text } = Typography;

export const Comenzando = {
    "title": "Comenzando",
    "content": (
        <div>
            <Title level={2}>Pre-Requisitos</Title>
            <Paragraph>
                Primero es necesario tener instalado NodeJS en el equipo, para esto se descarga mediante el sitio web oficial:
            </Paragraph>
            <a href="https://nodejs.org/es/">NodeJS.</a>
            <Paragraph>
                También es necesario tener instalado MongoDB en el equipo, para esto se descarga mediante el sitio web oficial:
            </Paragraph>
            <a href="https://www.mongodb.com/es">MongoDB.</a>
            <Paragraph>
                Y se debe tener en ejecución el servidor MongoDB.
            </Paragraph>
            <Title level={2}>Instalación y Comandos básicos</Title>
            <Paragraph>
                Primero se debe hubicar una consola o terminal en el directorio del proyecto (la aplicación web está en un directorio separado de la aplicación de escritorio), luego se debe acceder por separado a cada directorio y ejecutar el siguiente comando:
            </Paragraph>
            <Text code>npm install</Text>
            <Paragraph>
                Luego, para el caso de la aplicación web se debe ejecutar el siguiente comando para poner en marcha tanto el servidor de desarrollo de react como el servidor express (NodeJS) que recibe las peticiones de la aplicación web:
            </Paragraph>
            <Text code>npm run dev</Text>
            <Paragraph>
                El siguiente comando en la aplicación web realiza el traspaso de código en lenguaje jsx a javascript puro mediante webpack:
            </Paragraph>
            <Text code>npm run build</Text>
            <Paragraph>
                Este comando posiciona el código de salida en el directorio del cual el servidor Express carga dicho archivo (esto es más que nada para la etapa de producción).
            </Paragraph>
            <Paragraph>
                El siguiente comando en la aplicación web ejecuta el servidor Express en modo de producción:
            </Paragraph>
            <Text code>npm start</Text>
            <Paragraph>
                Ahora para el caso de la aplicación de escritorio, se describen los siguientes comandos:
            </Paragraph>
            <Text code>npm start</Text>
            <Paragraph>
                Este comando pone en marcha el servidor de desarrollo para el ambiente de ReactJS.
            </Paragraph>
            <Text code>npm run build</Text>
            <Paragraph>
                Este comando genera el código javascript puro en base al código ReactJS.
            </Paragraph>
            <Text code>npm run electron-dev</Text>
            <Paragraph>
                Este comando es el que ejecuta tanto el entorno de desarrollo de ReactJS como la aplicación ElectronJS.
            </Paragraph>
            <Text code>npm run pack</Text>
            <Paragraph>
                Este comando empaqueta la aplicación ElectronJS.
            </Paragraph>
            <Text code>npm run dist</Text>
            <Paragraph>
                Finalmente este comando genera el instalador de la apliación ElectronJS.
            </Paragraph>
        </div>
        )
}