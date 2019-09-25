import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Typography, Table } from 'antd';
const { Paragraph, Title } = Typography;
const { Column } = Table;
const codeString = "import React, { Component } from 'react';\nimport { connect } from 'react-redux';\nimport { toggleFile, onEdit, changeName, removeFile } from '../actions/FileManager';\nimport { handlerDownload } from '../actions/home';\nimport { Tabs, Icon, Typography, Modal } from 'antd';\nimport './FileManager.css';\nconst { TabPane } = Tabs;\nconst { Paragraph } = Typography;\nconst { confirm } = Modal;\nclass FileManager extends Component {\n\trender(){\n\t\treturn (\n\t\t\t<div className='file-manager'>\n\t\t\t\t<Tabs\n\t\t\t\t\tonChange={this.props.handlerToggle}\n\t\t\t\t\tactiveKey={this.props.currentFile}\n\t\t\t\t\ttype='editable-card'\n\t\t\t\t\tonEdit={this.props.handlerEdit}\n\t\t\t\t>\n\t\t\t\t\t{this.props.files.map((pane, indx) => (\n\t\t\t\t\t\t<TabPane className='tab-content' tab={\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<Paragraph className='display-inline' editable={{ onChange: str=>{this.props.handlerChangeName(str, pane.key, indx, this)} }}>{pane.title}\n\t\t\t\t\t\t\t\t</Paragraph>\n\t\t\t\t\t\t\t\t<Icon type='close' className='close' onClick={(e)=>{this.props.showConfirm(e, this.props.currentFile, this.props.files)}}/>\n\t\t\t\t\t\t\t</div>} key={pane.key}>\n\t\t\t\t\t\t\t{pane.content}\n\t\t\t\t\t\t</TabPane>\n\t\t\t\t\t))}\n\t\t\t\t</Tabs>\n\t\t\t</div>\n\t\t);\n\t}\n}\nconst mapStateToProps = state => {\n\treturn {\n\t\tnewTabIndex: state.newTabIndex,\n\t\tfiles: state.files,\n\t\tcurrentFile: state.currentFile\n\t};\n}\nconst mapDispatchToProps = dispatch => {\n\treturn {\n\t\thandlerToggle(activeKey) {\n\t\t\tdispatch(toggleFile(activeKey));\n\t\t},\n\t\thandlerEdit(targetKey, action){\n\t\t\tdispatch(onEdit(action));\n\t\t},\n\t\thandlerChangeName(newName, key, indx, tab){\n\t\t\tdispatch(changeName(newName, key, indx));\n\t\t\ttab.forceUpdate();\n\t\t},\n\t\tshowConfirm(e, key, files) {\n\t\t\tconfirm({\n\t\t\t\ttitle: 'Cuidado!',\n\t\t\t\tcontent: 'Haz realizado cambios en el archivo, ¿Deseas descargar el archivo antes de cerrarlo?',\n\t\t\t\tonOk() {\n\t\t\t\t\tconst fileTarget = files.filter(ofile => ofile.key === key)[0];\n\t\t\t\t\tif(fileTarget && fileTarget.saved === false){\n\t\t\t\t\t\thandlerDownload(dispatch, key, files);\n\t\t\t\t\t}\n\t\t\t\t\tdispatch(removeFile(key));\n\t\t\t\t},\n\t\t\t\tonCancel() {dispatch(removeFile(key));},\n\t\t\t});\n\t\t}\n\t}\n}\nexport default connect(mapStateToProps, mapDispatchToProps)(FileManager);";
const tablaShowConfirm = [
    {
      key: '1',
      parametro: 'e',
      descripcion: 'evento.',
      tipo: 'evento',
    },
    {
        key: '2',
        parametro: 'key',
        descripcion: 'La key correspondiente al archivo correspondiente.',
        tipo: 'String',
      },
      {
        key: '3',
        parametro: 'files',
        descripcion: 'El arreglo que contiene los archivos en uso.',
        tipo: 'Array',
      },
  ];

const tablaHandlerChangeName = [
    {
      key: '1',
      parametro: 'newName',
      descripcion: 'Nuevo nombre para el archivo (obtenido al editar el texto de la pestaña del archivo en cuestión).',
      tipo: 'String',
    },
    {
        key: '2',
        parametro: 'key',
        descripcion: 'La key correspondiente al archivo correspondiente.',
        tipo: 'String',
      },
      {
        key: '3',
        parametro: 'indx',
        descripcion: 'El índice del archivo en el arreglo de archivos.',
        tipo: 'Número',
      },
      {
        key: '4',
        parametro: 'tab',
        descripcion: 'El objeto FileManager en sí, para actualizar la interfaz al cambiar el nombre.',
        tipo: 'Component',
      },
  ];

  const tablaHandlerEdit = [
    {
      key: '1',
      parametro: 'targetKey',
      descripcion: 'La key correspondiente al archivo en el que se ejecutará la acción.',
      tipo: 'String',
    },
    {
        key: '2',
        parametro: 'action',
        descripcion: 'acción devuelta por el componenete de ant design (add, remove, etc)',
        tipo: 'String',
      }
  ];
const tablaHandlerToggle = [
    {
      key: '1',
      parametro: 'activeKey',
      descripcion: 'La key correspondiente al archivo que se mostrará (pestaña).',
      tipo: 'String',
    }
  ];

const tablaFileManager = [
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
    },{
        key: '3',
        atributo: 'currentFile',
        descripcion: 'La key correspondiente al archivo actual (el que se está visualizando, cuando no hay archivos abiertos, este valor es null).',
        tipo: 'String',
    }
  ];


export const AdministradorDeArchivos = {
    "title": "Administrador de archivos",
    "content": (
        <div>
            <Title level={2}>El componenete "FileManager".</Title>
            <SyntaxHighlighter language="javascript" style={docco}>
                    <Paragraph copyable>
                        {
                            codeString
                        }
                    </Paragraph>
                </SyntaxHighlighter>
            <Table dataSource={tablaFileManager}>
                <Column title="Atributo" dataIndex="atributo" />
                <Column title="Descripción" dataIndex="descripcion" />
                <Column title="Tipo" dataIndex="tipo" />
            </Table>
            <Title level={4}>La función "map" .</Title>
            <p>La función "map" itera el arreglo de archivos global definido en el store.js para generar una pestaña por cada archivo en uso.</p>
            <Title level={4}>La función "mapStateToProps" .</Title>
            <p>La función "mapStateToProps" es la que como dice su nombre, mapea el estado del store.js como propiedad de la clase "FileManager" (ver documentación de redux y react-redux para más información).</p>
            <Title level={4}>La función "mapDispatchToProps" .</Title>
            <p>La función "mapDispatchToProps" es la que como dice su nombre, mapea el despacho (dispatch) de acciones (actions) que son cargadas desde "actions/[component].js" (Es esta la que despacha la acción con el objeto con el respectivo "type" y "datos" necesarios, enviando este objeto al reducer ubicado en "store.js" que ejecuta una acción para actualizar el estado global de la aplicación dependiendo del type de la acción) como propiedad de la clase "FileManager" (ver documentación de redux y react-redux para más información).</p>
            <Title level={2}>La función "handlerToggle" .</Title>
            <Table dataSource={tablaHandlerToggle}>
                <Column title="Parametro" dataIndex="parametro" />
                <Column title="Descripción" dataIndex="descripcion" />
                <Column title="Tipo" dataIndex="tipo" />
            </Table>
            <Title level={2}>La función "handlerEdit" .</Title>
            <Table dataSource={tablaHandlerEdit}>
                <Column title="Parametro" dataIndex="parametro" />
                <Column title="Descripción" dataIndex="descripcion" />
                <Column title="Tipo" dataIndex="tipo" />
            </Table>
            <Title level={2}>La función "handlerChangeName" .</Title>
            <Table dataSource={tablaHandlerChangeName}>
                <Column title="Parametro" dataIndex="parametro" />
                <Column title="Descripción" dataIndex="descripcion" />
                <Column title="Tipo" dataIndex="tipo" />
            </Table>
            <Title level={2}>La función "showConfirm" .</Title>
            <Table dataSource={tablaShowConfirm}>
                <Column title="Parametro" dataIndex="parametro" />
                <Column title="Descripción" dataIndex="descripcion" />
                <Column title="Tipo" dataIndex="tipo" />
            </Table>
        </div>
        )
}