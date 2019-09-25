import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Typography } from 'antd';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
const { Paragraph, Title } = Typography;

const codeString = "+---+ archetype-editor-desktop\n\t|---+ public\n\t\t|---+ electron.js\n\t\t|---+ index.html\n\t|---+ src\n\t\t|---+ actions\n\t\t|---+ components\n\t\t|---+ store\n\t|---+ .gitignore\n\t|---+ package.json\n\t|---+ package-lock.json\n";

export const InfraestructuraDesktop = {
    "title": "Infraestructura Aplicación Desktop",
    "content": (
        <div>
            <SyntaxHighlighter language="javascript" style={docco}>
                <Paragraph>
                    {
                        codeString
                    }
                </Paragraph>
            </SyntaxHighlighter>            
            <Title level={2}>El directorio "public"</Title>
            <p>En este directorio se encuentra el archivo index.html que se monta en la aplicación electron si es que se está en modo producción y el archivo "electron.js", que es el clásico "main.js" de electron, es decir, el código que define la aplicación electron.</p>
            <Title level={3}>El directorio "src"</Title>
            <p>En este directorio se encuentran los componentes, el store, y las actions correspondientes para el uso de react-redux.</p>
            <Title level={3}>El archivo "index.html"</Title>
            <p>En este archivo se encuentra el código html principal en donde se monta la aplicación react.</p>
        </div>
        )
}