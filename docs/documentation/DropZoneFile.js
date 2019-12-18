import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Typography, Table } from 'antd';
const { Paragraph, Title } = Typography;
const { Column } = Table;
const codeString = "import React, { Component } from 'react'\nimport { connect } from 'react-redux';\nimport { openFile } from '../actions/DropZoneFile';\nimport { toggleOpenFileDialog } from '../actions/home';\nimport { feedBackMessage } from '../actions/others';\nimport { Icon, message } from 'antd';\nimport './DropZoneFile.css'\nclass Dropzone extends Component {\n\tconstructor(props) {\n\t\tsuper(props);\n\t\tthis.state = { hover: false };\n\t\tthis.fileInputRef = React.createRef();\n\t\tthis.openFileDialog = this.openFileDialog.bind(this);\n\t\tthis.onFilesAdded = this.onFilesAdded.bind(this);\n\t\tthis.onDragOver = this.onDragOver.bind(this);\n\t\tthis.onDragLeave = this.onDragLeave.bind(this);\n\t\tthis.onDrop = this.onDrop.bind(this)\n\t}\n\topenFileDialog() {\n\t\tif (this.props.disabled) return;\n\t\tthis.fileInputRef.current.click();\n\t}\n\tonFilesAdded(evt) {\n\t\tif (this.props.disabled) return;\n\t\tconst files = evt.target.files;\n\t\tconst aFiles = this.fileListToArray(files);\n\t\tif(aFiles.length > 0){\n\t\t\tthis.props.handlerAddFiles(aFiles, this.props.newTabIndex, this.props.files, this.fileInputRef);\n\t\t}\n\t}\n\tonDragOver(evt) {\n\t\tevt.preventDefault();\n\t\tif (this.props.disabled) return;\n\t\tthis.setState({ hover: true });\n\t}\n\tonDragLeave() {\n\t\tthis.setState({ hover: false });\n\t}\n\tonDrop(event) {\n\t\tevent.preventDefault();\n\t\tif (this.props.disabled) return;\n\t\tconst files = event.dataTransfer.files;\n\t\tconst aFiles = this.fileListToArray(files);\n\t\tif(aFiles.length > 0){\n\t\t\tthis.props.handlerAddFiles(aFiles, this.props.newTabIndex, this.props.files, this.fileInputRef);\n\t\t}\n\t\tthis.setState({ hover: false });\n\t}\n\tfileListToArray(list) {\n\t\tconst array = [];\n\t\tfor (var i = 0; i < list.length; i++) {\n\t\t\tarray.push(list.item(i));\n\t\t}\n\t\treturn array;\n\t}\n\trender() {\n\t\treturn (\n\t\t\t<div\n\t\t\t\tclassName={`Dropzone ${this.state.hover ? 'hover' : ''}`}\n\t\t\t\tonDragOver={this.onDragOver}\n\t\t\t\tonDragLeave={this.onDragLeave}\n\t\t\t\tonDrop={this.onDrop}\n\t\t\t\tonClick={this.openFileDialog}\n\t\t\t\tstyle={{ cursor: this.props.disabled ? 'default' : 'pointer' }}\n\t\t\t>\n\t\t\t\t<input\n\t\t\t\t\tref={this.fileInputRef}\n\t\t\t\t\tclassName='FileInput'\n\t\t\t\t\ttype='file'\n\t\t\t\t\taccept='.json, .xml, .adl'\n\t\t\t\t\tmultiple\n\t\t\t\t\tonChange={this.onFilesAdded}\n\t\t\t\t/>\n\t\t\t\t<Icon type='inbox' />\n\t\t\t\t<span>Haz click o arrastra archivos a esta área para abrirlos</span>\n\t\t\t</div>\n\t\t)\n\t}\n}\nconst mapStateToProps = state => {\n\treturn{\n\t\tnewTabIndex: state.newTabIndex,\n\t\tfiles: state.files\n\t};\n}\nconst mapDispatchToProps = dispatch => {\n\treturn {\n\t\thandlerAddFiles(aFiles, newTabIndex, files, ref) {\n\t\t\tif (window.FileReader) {\n\t\t\taFiles.forEach(file => {\n\t\t\t\ttry {\n\t\t\t\t\tconst ext = file.name.split('.').pop();\n\t\t\t\t\tif (ext === 'adl' || ext === 'json' || ext === 'xml' ) {\n\t\t\t\t\t\tconst equalFiles = files.filter(ofile => ofile.title === file.name);\n\t\t\t\t\t\tif (equalFiles.length <= 0) {\n\t\t\t\t\t\tconst reader = new FileReader();\n\t\t\t\t\t\tconst nFile = { title: '', content: '', saved: false, key: '0' };\n\t\t\t\t\t\tnFile.key = (newTabIndex + 1).toString();\n\t\t\t\t\t\tnewTabIndex+=1;\n\t\t\t\t\t\tnFile.title = file.name;\n\t\t\t\t\t\treader.onload = (r)=>{\n\t\t\t\t\t\t\tnFile.content = r.target.result;\n\t\t\t\t\t\t\tfiles = files.concat(nFile);\n\t\t\t\t\t\t\tdispatch(openFile(files, newTabIndex));\n\t\t\t\t\t\t}\n\t\t\t\t\t\treader.readAsText(file, 'UTF-8');\n\t\t\t\t\t\tfeedBackMessage({ type: 'success', msg: 'El archivo ' + file.name + ' se cargó correctamente.'});\n\t\t\t\t\t} else {\n\t\t\t\t\t\tfeedBackMessage({ type: 'warning', msg: 'El archivo ' + file.name + ' no se cargó debido a que ya se encuentra en uso.'});\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t} catch (error) {\n\t\t\t\t\t\tfeedBackMessage({ type: 'error', msg: 'El archivo ' + file.name + ' no se pudo cargar.'});\n\t\t\t\t\t\tconsole.log(error);\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t\tref.current.value = null;\n\t\t\t\tdispatch(toggleOpenFileDialog(false));\n\t\t\t}\n\t\t}\n\t}\n}\nexport default connect(mapStateToProps, mapDispatchToProps)(Dropzone);";
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
export const DropZoneFile = {
    "title": "Cargador de archivos",
    "content": (
        <div>
            <Title level={2}>El componenete "DropZoneFile".</Title>
            <SyntaxHighlighter language="javascript" style={docco}>
                    <Paragraph copyable>
                        {
                            codeString
                        }
                    </Paragraph>
                </SyntaxHighlighter>
            <Table dataSource={tablaDropZoneFile}>
                <Column title="Atributo" dataIndex="atributo" />
                <Column title="Descripción" dataIndex="descripcion" />
                <Column title="Tipo" dataIndex="tipo" />
            </Table>
            <Title level={4}>La función "mapStateToProps" .</Title>
            <p>La función "mapStateToProps" es la que como dice su nombre, mapea el estado del store.js como propiedad de la clase "FileManager" (ver documentación de redux y react-redux para más información).</p>
            <Title level={4}>La función "mapDispatchToProps" .</Title>
            <p>La función "mapDispatchToProps" es la que como dice su nombre, mapea el despacho (dispatch) de acciones (actions) que son cargadas desde "actions/[component].js" (Es esta la que despacha la acción con el objeto con el respectivo "type" y "datos" necesarios, enviando este objeto al reducer ubicado en "store.js" que ejecuta una acción para actualizar el estado global de la aplicación dependiendo del type de la acción) como propiedad de la clase "FileManager" (ver documentación de redux y react-redux para más información).</p>
            <Title level={2}>La función "handlerAddFiles" .</Title>
            <p>
              Esta función es la encargada de analizar el arreglo de los archivos seleccionados por el usuario para
              para luego agregarlos uno por uno al estado global de la aplicación (store), mediante el despacho de la acción
              "openFile".
            </p>
            <Table dataSource={tablahandlerAddFiles}>
                <Column title="Parametro" dataIndex="parametro" />
                <Column title="Descripción" dataIndex="descripcion" />
                <Column title="Tipo" dataIndex="tipo" />
            </Table>
        </div>
        )
}