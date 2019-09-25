import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Typography } from 'antd';
const { Paragraph, Title } = Typography;

const codeString = "+---+ archetype-editor-web\n\t|---+ backend\n\t\t|---+ models\n\t\t|---+ public\n\t\t|---+ routes\n\t\t|---+ db.js\n\t\t|---+ index.js\n\t|---+ frontend\n\t\t|---+ src\n\t\t\t|---+ actions\n\t\t\t|---+ components\n\t\t\t|---+ store\n\t\t|---+ index.html\n\t|---+ .babelrc\n\t|---+ .gitignore\n\t|---+ package.json\n\t|---+ package-lock.json\n\t|---+ webpack.config.json\n";


export const InfraestructuraWeb = {
    "title": "Infraestructura Aplicación Web",
    "content": (
        <div>
            
                <SyntaxHighlighter language="javascript" style={docco}>
                    <Paragraph>
                        {
                            codeString
                        }
                    </Paragraph>
                </SyntaxHighlighter>
            
            <Title level={2}>El directorio "backend"</Title>
            <p>En este directorio se encuentran todos los archivos relacionados con el servidor.</p>
            <Title level={3}>El directorio "models"</Title>
            <p>En este directorio se encuentran todos los archivos relacionados con los modelos de datos, es en cada archivo de este directorio donde se define el schema correspondiente al dato de la DB MongoDB.</p>
            <Title level={3}>El directorio "public"</Title>
            <p>En este directorio se encuentran todos los archivos públicos del servidor, en este caso aquí se almacena el código compilado a html, css, y js puro.</p>
            <Title level={3}>El directorio "routes"</Title>
            <p>En este directorio se encuentran todos los archivos relacionados con las rutas para el manejo de peticiones desde la aplicación web/desktop para la interacción con la DB.</p>
            <Title level={3}>El archivo "db.js"</Title>
            <p>En este archivo se encuentra la conexión a la base de datos MongoDB, mediante mongoose.</p>
            <Title level={3}>El archivo "index.js"</Title>
            <p>En este archivo se encuentra el código principal que se ejecutará en el servidor, es aquí donde se define el comportamiento lógico del servidor, aquí se inicializa el servidor express y se le asignan los paámetros correspondientes (rutas, etc).</p>
            <Title level={2}>El directorio "frontend"</Title>
            <p>En este directorio se encuentran todos los archivos relacionados con la aplicación cliente.</p>
            <Title level={3}>El directorio "src"</Title>
            <p>En este directorio se encuentran los componentes, el store, y las actions correspondientes para el uso de react-redux.</p>
            <Title level={3}>El archivo "index.html"</Title>
            <p>En este archivo se encuentra el código html principal en donde se monta la aplicación react.</p>   
        </div>
        )
}