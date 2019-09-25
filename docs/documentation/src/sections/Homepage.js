import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Typography, Table } from 'antd';
const { Paragraph, Title } = Typography;
const { Column } = Table;
const codeString = "import React, { Component } from 'react'; \nimport { connect } from 'react-redux';\nimport { changeTitle, toggleOpenFileDialog, handlerDownload, handlerSaveAs } from '../actions/home';\nimport FileManager from './FileManager';\nimport { onEdit } from '../actions/FileManager';\nimport DropZone from './DropZoneFile';\nimport { Button, Layout, Menu, Icon, Dropdown, Modal, Row } from 'antd';\nimport './home.css';\nimport ButtonGroup from 'antd/lib/button/button-group';\nconst { SubMenu } = Menu;\nconst { Content, Footer, Sider} = Layout;\nvar Maximize=true;\nclass Home extends Component {\n\tconstructor(props){\n\t\tsuper(props);\n\t\tthis.toggle = this.toggle.bind(this);\n\t\tthis.handlerWindowClose = this.handlerWindowClose.bind(this);\n\t\tthis.handlerWindowMinimize = this.handlerWindowMinimize.bind(this);\n\t\tthis.handlerWindowMaximize = this.handlerWindowMaximize.bind(this);\n\t\tthis.handlerWindowRestore = this.handlerWindowRestore.bind(this);\n\t\tthis.state = {collapsed:false};\n\t\tthis.MenuFile = this.MenuFile.bind(this);\n\t\tthis.MenuHelp = this.MenuHelp.bind(this);\n\t\tthis.MenuEdit = this.MenuEdit.bind(this);\n\t\tthis.MenuSelection = this.MenuSelection.bind(this);\n\t}\n\tMenuFile() {\n\t\treturn(<Menu theme='light'>\n\t\t\t<Menu.Item key='nwfile' onClick={this.props.handlerAdd}><Icon type='file' /> Nuevo Archivo</Menu.Item>\n\t\t\t<Menu.Item key='opfile' onClick={() => this.props.handlerDialogOpenFile(true)}>\n\t\t\t\t<Icon type='upload' /> Abrir archivo\n\t\t\t</Menu.Item>\n\t\t\t<Menu.Item key='svsave' onClick={()=>{this.props.handlerDownloadFile(this.props.electron.ipcRenderer, this.props.currentFile, this.props.files)}}>\n\t\t\t\t<Icon type='download' /> Guardar Archivo\n\t\t\t</Menu.Item>\n\t\t\t<Menu.Item key='svsaveas' onClick={()=>{this.props.handlerSaveAsFile(this.props.electron.ipcRenderer, this.props.currentFile, this.props.files)}}>\n\t\t\t\t<Icon type='download' /> Guardar Como...\n\t\t\t</Menu.Item>\n\t\t\t<Menu.Item key='quit' onClick={this.handlerWindowClose}>Salir</Menu.Item>\n\t\t</Menu>);\n\t}\n\tMenuEdit(){\n\t\treturn(<Menu theme='light'>\n\t\t\t<Menu.Item key='undo'>Deshacer</Menu.Item>\n\t\t\t<Menu.Item key='redo'>Rehacer</Menu.Item>\n\t\t\t<Menu.Item key='cut'>Cortar</Menu.Item>\n\t\t\t<Menu.Item key='copy'>Copiar</Menu.Item>\n\t\t\t<Menu.Item key='paste'>Pegar</Menu.Item>\n\t\t</Menu>);\n\t}\n\tMenuSelection(){\n\t\treturn(<Menu theme='light'>\n\t\t\t<Menu.Item key='slc'>Seleccionar todo</Menu.Item>\n\t\t</Menu>);\n\t}\n\tMenuHelp(){\n\t\treturn(<Menu theme='light'>\n\t\t\t<Menu.Item key='docu'>Documentation</Menu.Item>\n\t\t\t<Menu.Item key='about'>Acerca de Editor de Arquetipos</Menu.Item>\n\t\t</Menu>);\n\t}\n\thandlerWindowMinimize(event) {\n\t\tevent.preventDefault();\n\t\tconst { ipcRenderer } = this.props.electron;\n\t\tipcRenderer.send('mainWindow:minimize');\n\t\tevent.stopPropagation();\n\t}\n\thandlerWindowClose(event) {\n\t\tif (event.key && event.key !== 'quit') {\n\t\t\tevent.preventDefault();\n\t\t\tevent.stopPropagation();\n\t\t}\n\t\tconst { ipcRenderer } = this.props.electron;\n\t\tipcRenderer.send('mainWindow:close');\n\t}\n\thandlerWindowMaximize(event) {\n\t\tevent.preventDefault();\n\t\tconst { ipcRenderer } = this.props.electron;\n\t\tipcRenderer.send('mainWindow:maximize');\n\t\tif(Maximize===true){\n\t\t\tMaximize=false;\n\t\t\tconsole.log(Maximize);\n\t\t}\n\t\tevent.stopPropagation();\n\t}\n\thandlerWindowRestore(event) {\n\t\tevent.preventDefault();\n\t\tconst { ipcRenderer } = this.props.electron;\n\t\tipcRenderer.send('mainWindow:restore');\n\t\tif(Maximize===false){\n\t\t\tMaximize=true;\n\t\t\tconsole.log(Maximize);\n\t\t}\n\t\tevent.stopPropagation();\n\t}\n\ttoggle() {\n\t\tthis.setState(state => ({ collapse: !state.collapse }));\n\t}\n\trender(){\n\t\treturn (\n\t\t\t<div >\n\t\t\t\t<Modal\n\t\t\t\t\ttitle='Abrir Archivo'\n\t\t\t\t\tcentered\n\t\t\t\t\tvisible={this.props.dialogOpenFile}\n\t\t\t\t\tonOk={() => this.props.handlerDialogOpenFile(false)}\n\t\t\t\t\tonCancel={() => this.props.handlerDialogOpenFile(false)}\n\t\t\t\t>\n\t\t\t\t\thist<DropZone />\n\t\t\t\t</Modal>\n\t\t\t\t<Layout id='baraction' >\n\t\t\t\t\t<Row className='nav-bar'>\n\t\t\t\t\t\t<ButtonGroup id='nomove1'>\n\t\t\t\t\t\t\t<Icon type='fire' />\n\t\t\t\t\t\t\t<Dropdown overlay={ this.MenuFile } trigger={['click']}>\n\t\t\t\t\t\t\t\t<Button type='link' ghost>\n\t\t\t\t\t\t\t\t\tArchivo\n\t\t\t\t\t\t\t\t</Button>\n\t\t\t\t\t\t\t</Dropdown>\n\t\t\t\t\t\t\t<Dropdown overlay={ this.MenuEdit } trigger={['click']}>\n\t\t\t\t\t\t\t\t<Button type='link' ghost>\n\t\t\t\t\t\t\t\t\tEditar\n\t\t\t\t\t\t\t\t</Button>\n\t\t\t\t\t\t\t</Dropdown>\n\t\t\t\t\t\t\t<Dropdown overlay={ this.MenuSelection } trigger={['click']}>\n\t\t\t\t\t\t\t\t<Button type='link' ghost>\n\t\t\t\t\t\t\t\t\tSeleccion\n\t\t\t\t\t\t\t\t</Button>\n\t\t\t\t\t\t\t</Dropdown>\n\t\t\t\t\t\t\t<Dropdown overlay={ this.MenuHelp} trigger={['click']}>\n\t\t\t\t\t\t\t\t<Button type='link' ghost>\n\t\t\t\t\t\t\t\t\tAyuda\n\t\t\t\t\t\t\t\t</Button>\n\t\t\t\t\t\t\t</Dropdown>\n\t\t\t\t\t\t</ButtonGroup>\n\t\t\t\t\t\t<ButtonGroup id='buttongroup'>\n\t\t\t\t\t\t\t<Button type='link' ghost  onClick={this.handlerWindowMinimize}>\n\t\t\t\t\t\t\t\t<svg aria-hidden='true' version='1.1' width='10' height='10'>\n\t\t\t\t\t\t\t\t<path fill='currentColor' d='M 0,5 10,5 10,6 0,6 Z' />\n\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t</Button>\n\t\t\t\t\t\t\t{ Maximize===true ?  (\n\t\t\t\t\t\t\t\t<Button type='link' ghost onClick={this.handlerWindowMaximize}>\n\t\t\t\t\t\t\t\t\t❐\n\t\t\t\t\t\t\t\t</Button>\n\t\t\t\t\t\t\t) : (\n\t\t\t\t\t\t\t<Button type='link' ghost onClick={this.handlerWindowRestore} >\n\t\t\t\t\t\t\t\t❐\n\t\t\t\t\t\t\t</Button>\n\t\t\t\t\t\t\t)}\n\t\t\t\t\t\t\t<Button type='danger' onClick={this.handlerWindowClose}>\n\t\t\t\t\t\t\t\tx\n\t\t\t\t\t\t\t</Button>\n\t\t\t\t\t\t</ButtonGroup>\n\t\t\t\t\t</Row>\n\t\t\t\t</Layout>\n\t\t\t\t<Layout>\n\t\t\t\t\t<Sider collapsible onClick={this.toggle} style={{ minHeight: '100vh' }}>\n\t\t\t\t\t\t<Menu\n\t\t\t\t\t\t\ttheme='dark'\n\t\t\t\t\t\t\tmode='inline'\n\t\t\t\t\t\t>\n\t\t\t\t\t\t\t<SubMenu\n\t\t\t\t\t\t\t\tkey='cap1'\n\t\t\t\t\t\t\t\ttitle={\n\t\t\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t\t\t<Icon type='folder' />\n\t\t\t\t\t\t\t\t\t\t<span>Carpeta 1</span>\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t<Menu.Item key='1'>Archetype 1</Menu.Item>\n\t\t\t\t\t\t\t\t<Menu.Item key='2'>Archetype 2</Menu.Item>\n\t\t\t\t\t\t\t\t<Menu.Item key='3'>Archetype 3</Menu.Item>\n\t\t\t\t\t\t\t\t<Menu.Item key='4'>Archetype 4</Menu.Item>\n\t\t\t\t\t\t\t</SubMenu>\n\t\t\t\t\t\t\t<SubMenu\n\t\t\t\t\t\t\t\tkey='cap2'\n\t\t\t\t\t\t\t\ttitle={\n\t\t\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t\t\t<Icon type='folder' />\n\t\t\t\t\t\t\t\t\t\t<span>Carpeta 2</span>\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t<Menu.Item key='5'>Archetype 1</Menu.Item>\n\t\t\t\t\t\t\t\t<Menu.Item key='6'>Archetype 2</Menu.Item>\n\t\t\t\t\t\t\t\t<Menu.Item key='7'>Archetype 3</Menu.Item>\n\t\t\t\t\t\t\t\t<Menu.Item key='8'>Archetype 4</Menu.Item>\n\t\t\t\t\t\t\t</SubMenu>\n\t\t\t\t\t\t\t<SubMenu\n\t\t\t\t\t\t\t\tkey='Blocks'\n\t\t\t\t\t\t\t\ttitle={\n\t\t\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t\t\t<Icon type='block' />\n\t\t\t\t\t\t\t\t\t\t<span>Bloques</span>\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t<Menu.Item key='block1'>Bloque1</Menu.Item>\n\t\t\t\t\t\t\t</SubMenu>\n\t\t\t\t\t\t</Menu>\n\t\t\t\t\t</Sider>\n\t\t\t\t\t<Layout>\n\t\t\t\t\t\t<Content>\n\t\t\t\t\t\t\t<Layout>\n\t\t\t\t\t\t\t\t<FileManager />\n\t\t\t\t\t\t\t</Layout>\n\t\t\t\t\t\t</Content>\n\t\t\t\t\t\t<Footer style={{ textAlign: 'center' }}>\n\t\t\t\t\t\t\tArchetypes ©2019 Created by WorkOrWate\n\t\t\t\t\t\t</Footer>\n\t\t\t\t\t</Layout>\n\t\t\t\t</Layout>\n\t\t\t</div>\n\t\t);\n\t}\n}\nconst mapStateToProps = state => {\n\treturn {\n\t\ttitle: state.title,\n\t\tdialogOpenFile: state.dialogOpenFile,\n\t\tcurrentFile: state.currentFile,\n\t\tfiles: state.files,\n\t\telectron: state.electron\n\t};\n}\nconst mapDispatchToProps = dispatch => {\n\treturn {\n\t\thandlerAdd(){\n\t\t\tdispatch(onEdit('add'));\n\t\t},\n\t\thandlerChangeTitle(newtitle) {\n\t\t\tdispatch(changeTitle(newtitle));\n\t\t},\n\t\thandlerDialogOpenFile(modalState) {\n\t\t\tdispatch(toggleOpenFileDialog(modalState));\n\t\t},\n\t\thandlerDownloadFile(ipc, file, files) {\n\t\t\thandlerDownload(ipc, file, files)\n\t\t},\n\t\thandlerSaveAsFile(ipc, file, files) {\n\t\t\thandlerSaveAs(ipc, file, files)\n\t\t}\n\t}\n}\nnexport default connect(mapStateToProps, mapDispatchToProps)(Home);";

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
export const Homepage = {
    "title": "Pagina de Inicio",
    "content": (
        <div>
            <Title level={2}>El componenete "Home.js".</Title>
            <SyntaxHighlighter language="javascript" style={docco}>
                    <Paragraph copyable>
                        {
                            codeString
                        }
                    </Paragraph>
                </SyntaxHighlighter>
            
            <Title level={4}>La función "toggle" .</Title>
            <p>
              Esta función se encarga de expandir el contenido de los Sub Menu".
            </p>
            <Title level={4}>Las funcines "Menu" .</Title>
            <p>
              Estas funciones son las que contienen nuestros menus de archivos, con las que podremos abrir, cargar, guardar, etc".
            </p>
            
            
        </div>
        )
}