import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Typography, Table } from 'antd';
const { Paragraph, Title } = Typography;
const { Column } = Table;
const codeString = "import React from 'react';\n\nconst toggleFile = activeKey => {\n\treturn {\n\t\ttype: 'toggleFile',\n\t\tcurrentFile: activeKey\n\t};\n};\n\nconst onEdit = (action) => {\n\tif(action === 'add'){\n\t\treturn {\n\t\t\ttype: 'addFile',\n\t\t\tfile: { title: 'Nuevo archivo', content: {\n\t\t\t\tadl_version: ' '',\n\t\t\t\tarchetype_id: {value: 'Nuevo archivo'},\n\t\t\t\tconcept: ' '',\n\t\t\t\tdefinition: {\n\t\t\t\t\tattributes: [],\n\t\t\t\t\tnode_id: ' '',\n\t\t\t\t\toccurrences: {\n\t\t\t\t\t\tlower: ' '',\n\t\t\t\t\t\tlower_included: ' '',\n\t\t\t\t\t\tlower_unbounded: ' ',\n\t\t\t\t\t\tupper: ' ',\n\t\t\t\t\t\tupper_included: ' ',\n\t\t\t\t\t\tupper_unbounded: ' '\n\t\t\t\t\t},\n\t\t\t\t\trm_type_name: ' '\n\t\t\t\t},\n\t\t\t\tdescription: {\n\t\t\t\t\tdetails: {\n\t\t\t\t\t\tcopyright: ' ',\n\t\t\t\t\t\tkeywords: ' ',\n\t\t\t\t\t\tlanguage: {\n\t\t\t\t\t\tcode_string: ' ',\n\t\t\t\t\t\t\tterminology_id: {\n\t\t\t\t\t\t\tvalue: ' '\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t},\n\t\t\t\t\t\tmisuse: ' ',\n\t\t\t\t\t\tpurpose: ' ',\n\t\t\t\t\t\tuse: ' '\n\t\t\t\t\t},\n\t\t\t\t\tlifecycle_state: ' ',\n\t\t\t\t\toriginal_author: [],\n\t\t\t\t\tother_contribuitors: [],\n\t\t\t\t\tother_details: []\n\t\t\t\t},\n\t\t\t\tis_controlled: ' ',\n\t\t\t\tontology: {\n\t\t\t\t\tterm_definitions: {\n\t\t\t\t\t\titems: []\n\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\toriginal_language: {\n\t\t\t\t\tcode_string: ' ',\n\t\t\t\t\tterminology_id: {\n\t\t\t\t\t\tvalue: ' '\n\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\ttranslations: [],\n\t\t\t\tuid: {\n\t\t\t\t\tvalue: ' '\n\t\t\t\t}\n\t\t\t}, saved: false, key: '0', _id: '' ,\n\t\t\tallList: [\n\t\t\t\t{id:'Lista1',lista:[],type:'State'},\n\t\t\t\t{id:'Lista2',lista:[],type:'Protocol'},\n\t\t\t\t{id:'Lista3',lista:[],type:'Data'},\n\t\t\t\t{id:'Lista4',lista:[],type:'Events'},\n\t\t\t\t{id:'Lista5',lista:[],type:'Description'},\n\t\t\t\t{id:'Lista6',lista:[],type:'Atributtion'}\n\n\t\t\t]}\n\t\t};\n\t}\n\n};\n\nconst changeName = (newName, key, indx) => {\n\treturn {\n\t\ttype: 'changeFilename',\n\t\tkey,\n\t\tindx,\n\t\tnewName\n\t};\n};\n\nconst removeFile = key => {\n\treturn {\n\ttype: 'removeFile',\n\t\ttarget: key\n\t\t\t\t};\n}\n\nconst updateblocklist = (blocklist) =>{\n\treturn {\n\ttype: 'updateblocklist', \n\t\tblocklist\n\t}\n}\nexport { toggleFile, onEdit, changeName, removeFile, updateblocklist };";


const Tablaupdateblocklist = [
    {
      key: '1',
      atributo: 'blocklist',
      descripcion: 'La lista de bloques existentes es el parametro utilizado para que cuando se elimine algun archivo se pueda reorganizar.',
      tipo: 'String',
    }
  ];

  const TablaremoveFile = [
    {
      key: '1',
      atributo: 'Key',
      descripcion: 'Realiza utilización de la "key" para eliminar el archivo correcto.',
      tipo: 'String',
    }
  ];
const TablachangeName = [
    {
      key: '1',
      atributo: 'newName',
      descripcion: 'Es el nombre que le asignará al nuevo archivo temporalmete hasta que el usuario lo cambie, este nombre va acompañado de una key.',
      tipo: 'String',
    },{
        key: '2',
        atributo: 'key',
        descripcion: '"key" es la clave que tendra cada archivo creado y su funcion es diferenciar cada nombre de archivo creado, sin que se repita.',
        tipo: 'String',
      }
  ];

const TablatoggleFile = [
    {
      key: '1',
      atributo: 'activeKey',
      descripcion: 'La key correspondiente al archivo que se mostrará (pestaña).',
      tipo: 'String',
    }
  ];
  const TablaonEdit = [
    {
      key: '1',
      atributo: 'action',
      descripcion: 'Es el parámetro recibido al presionar la opción de nuevo archivo',
      tipo: 'String',
    }
  ];


export const AdministradorDeArchivos2 = {
    "title": "Administrador de archivos",
    "content": (
        <div>
            <SyntaxHighlighter language="javascript" style={docco}>
                    <Paragraph copyable>
                        {
                            codeString
                        }
                    </Paragraph>
                </SyntaxHighlighter>
            <Title level={2}>En la funcion "toggleFile".</Title>
            <Table dataSource={TablatoggleFile}>
                <Column title="Parametro" dataIndex="atributo" />
                <Column title="Descripción" dataIndex="descripcion" />
            </Table>
            <Title level={4}>La función "onEdit" .</Title>
            <p>La función "onEdit" crea la estructura del archivo json cada vez que uno crea un nuevo archivo de tal manera que uno podrá trabajar en esta area ya teniendo la estructura armada.</p>
            <Table dataSource={TablaonEdit}>
                <Column title="Parametro" dataIndex="atributo" />
                <Column title="Descripción" dataIndex="descripcion" />
            </Table>
            <Title level={4}>La función "changeName" .</Title>
            <p>La función "changeName" busca un nombre para la creacion de este nuevo archivo.</p>
            <Table dataSource={TablachangeName}>
                <Column title="Parametro" dataIndex="atributo" />
                <Column title="Descripción" dataIndex="descripcion" />
            </Table>
            <Title level={4}>La función "removeFile" .</Title>
            <p>La función "removeFile" es utilizada para eliminar un nuevo archivo, este hace uso de la "key" de tal modo de que el archivo eliminado sea el correcto.</p>
            <Table dataSource={TablaremoveFile}>
                <Column title="Parametro" dataIndex="atributo" />
                <Column title="Descripción" dataIndex="descripcion" />
            </Table>
            <Title level={2}>La función "updateblocklist" .</Title>
            <p>La función "updateblocklist" es la utilizada para actualizar las pestañas abiertas en ese momento ya sea que se agrega o se elimina una.</p>
            <Table dataSource={Tablaupdateblocklist}>
                <Column title="Parametro" dataIndex="atributo" />
                <Column title="Descripción" dataIndex="descripcion" />
            </Table>   
        </div>
        )
}