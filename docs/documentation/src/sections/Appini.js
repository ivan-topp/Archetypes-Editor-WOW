import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Typography, Table } from 'antd';
const { Paragraph, Title } = Typography;
const { Column } = Table;
const codeString = "import React, { Component } from 'react';\nimport { BrowserRouter, Route } from 'react-router-dom';\nimport { connect } from 'react-redux';\nimport Home from './Home';\nconst { electron } = window;\n//import { DatePicker } from 'antd';\nconst About = () => <h2>About</h2>;\nclass App extends Component {\n\tconstructor(props) {\n\t\tsuper(props);\n\t\tthis.state = {\n\t\tisMaximized:false,\n\t\t} \n\t}\n\tcomponentWillMount(){\n\t\tthis.props.setElectron(electron);\n\t\tconst { ipcRenderer } = electron;\n\t\tipcRenderer.on('mainWindow:isMaximized', (event, isMaximized) => {\n\t\t\tthis.setState({ isMaximized });\n\t\t});\n\t\tipcRenderer.send('mainWindow:isMaximized');\n\t}\n\trender(){\n\t\treturn (\n\t\t\t<BrowserRouter>\n\t\t\t\t<Route exact path='/' component={ Home } />\n\t\t\t\t<Route path='/about' component={ About } />\n\t\t\t</BrowserRouter>\n\t\t);\n\t}\n}\nconst mapStateToProps = state => {\n\treturn {\n\t\tfiles: state.files,\n\t\telectron: state.electron\n\t};\n}\nconst mapDispatchToProps = dispatch => {\n\treturn {\n\t\tsetElectron(electron) {\n\t\t\tdispatch({\n\t\t\ttype: 'setElectron',\n\t\t\telectron\n\t\t\t});\n\t\t}\n\t}\n}\nexport default connect(mapStateToProps, mapDispatchToProps)(App);";

const tablahandlerAddFiles = [
    {
      key: '1',
      parametro: 'aFiles',
      descripcion: 'Arreglo de objetos json con los datos de cada archivo seleccionado para cargar.',
      tipo: 'Array',
    },
    {
      key: '2',
      parametro: 'newTabIndex',
      descripcion: 'El contador actual para agregar la Key al archivo nuevo (abierto o creado).',
      tipo: 'Número',
    },
    {
      key: '3',
      parametro: 'files',
      descripcion: 'El arreglo que contiene los archivos en uso.',
      tipo: 'Array',
    },
    {
      key: '4',
      parametro: 'ref',
      descripcion: 'Referencia React al <input />.',
      tipo: 'Referencia React',
    }
];
const tablaDropZoneFile = [
    {
      key: '1',
      atributo: 'newTabIndex',
      descripcion: 'El contador actual para agregar la Key al archivo nuevo (abierto o creado).',
      tipo: 'Número',
    },{
        key: '2',
        atributo: 'files',
        descripcion: 'El arreglo que contiene los archivos en uso.',
        tipo: 'Array',
    }
];
export const Appini = {
    "title": "La Aplicación React",
    "content": (
        <div>
            <Title level={2}>El componenete "App.js".</Title>
            <SyntaxHighlighter language="javascript" style={docco}>
                    <Paragraph copyable>
                        {
                            codeString
                        }
                    </Paragraph>
                </SyntaxHighlighter>
            
            <Title level={4}>La función "mapStateToProps" .</Title>
            <p>La función "mapStateToProps" es la que como dice su nombre, mapea el estado del store.js.</p>
            <Title level={4}>La función "mapDispatchToProps" .</Title>
            <p>La función "mapDispatchToProps" es la que como dice su nombre mapea el despacho (dispatch) de acciones (actions), Esta función es la encargada de que al momento de que se comienze a renderizar la aplicación se setea el electron en la store .</p>
            <Title level={4}>La función "componentWillMount" .</Title>
            <p>
               Nos ayuda a enviar mensajes sincrónicos y asincrónicos desde el proceso de renderizado(página web) al proceso principal, como controlar el estado al momento de tener nuestra ventana de la app maximizada.
            </p>
        </div>
        )
}