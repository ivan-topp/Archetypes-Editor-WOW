import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Typography, Table } from 'antd';
const { Paragraph, Title } = Typography;
const { Column } = Table;
const codeString = "const openFile = (files, newTabIndex) => {\n\treturn {\n\t\ttype: 'openFile',\n\t\tfiles,\n\t\tnewTabIndex\n\t};\n};\nexport { openFile };";

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
export const DropZoneFile2 = {
    "title": "Cargador de archivos",
    "content": (
        <div>
            <Title level={2}>La funcion "openFile".</Title>
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
           
        </div>
        )
}