import React, { Component, Children } from 'react';
import { connect } from 'react-redux';
import { changeTitle, toggleOpenFileDialog, handlerDownload} from '../actions/home';
import { onEdit, updateblocklist  } from '../actions/FileManager';
import FileManager from './FileManager';
import DropZone from './DropZoneFile';
import { Button,Layout, Menu, Icon, Dropdown, Modal, Row, List, Col } from 'antd';
import './Home.css';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
const { SubMenu } = Menu;
const { Content, Footer, Sider} = Layout;
//-----------------------------------------------------------------------
//---------------------------Test----------------------------------------

const grid = 6;
  
const getItemStyle = (isDragging,draggableStyle ) => ({
    userSelect: "none",
    padding: grid * 5,
    marginTop: 10,
    marginLeft:20,
    marginRight:20,
    marginBottom:10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 30,
    border:"solid",
    background: isDragging ? "#6188C0" : "#6188C0", 
    ...draggableStyle
});
  
  //Estilo del fondo 
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "none" : "none",
  padding: 1,
  borderRadius: 10,
  width: 190
});

//---------------------------Fin del test--------------------------------
//-----------------------------------------------------------------------

class Home extends Component {
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            collapsed:false
        };
        this.MenuFile = this.MenuFile.bind(this);
        this.MenuHelp = this.MenuHelp.bind(this);
        this.MenuEdit = this.MenuEdit.bind(this);
        this.MenuSelection = this.MenuSelection.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }
    onDragEnd(result) {
        
        if (!result.destination) {
          return;
        }
    
        if (result.source.droppableId !== result.destination.droppableId) {
            let itemToMove;
            let allList = this.props.files.filter(file=>file.key===this.props.currentFile)[0].allList;
            allList.forEach((list,index) => {
                list.lista=list.lista.splice(0);
                /*if(result.source.droppableId === list.id){
                    itemToMove=allList[index].lista.splice(result.source.index,1)[0];
                    allListt
                }*/
            });
            //ALGORITMO PARA TRASLADO DE BLOQUE AQUI(TENER EN CUENTA POSIBILIDAD DE AISLAR LA LISTA DE PRUEBA)
            
            if (result.source.droppableId === "Lista0") {
                //console.log(allList[0].lista.filter(block => block.content === result.draggableId)[0]);
                itemToMove = this.props.sampleList.lista.filter(block => block.content === result.draggableId)[0];
                itemToMove = {id:itemToMove.id + this.props.currentFile + "Copia", content:itemToMove.content + this.props.currentFile + "Copia",type:itemToMove.type};
                //itemToMove = allList[0].lista.splice(result.source.index, 1)[0];
                const destinationlist = allList.filter(list => list.id === result.destination.droppableId)[0];
                //const originlist = allList.filter(list => list.id === result.source.droppableId)[0];
                //console.log(itemToMove[0], result.destination.index, items2);
               
                if(destinationlist.type===itemToMove.type){
                    console.log(result);
                    allList[allList.indexOf(destinationlist)].lista.splice(result.destination.index, 0, itemToMove);
                }
            }
            
            /*else { Comentado pq aun no se esta utilizando el mover un bloque de la lista x a la lista de prueba, y no
                        esta permitido la funcionalidad de que de una lista del workspace se transfiera a otra lista del workspace,
                        pues cada lista del workspace es un tipo de bloque especifico.
                itemToMove = allList[1].lista.splice(result.source.index, 1)[0];
                allList[0].lista.splice(result.destination.index, 0, itemToMove);
                console.log("Eliminando");
            }//estado*/

            //console.log(items1,items2);
            allList.forEach(list =>{
                    this.props.handlerUpdateList(list);
            });
                
        } else {
                /*let lista={}; Movimiento de los bloques en la misma lista
                if (result.source.droppableId === "Lista0") {
                    lista = {id: this.props.allList[0].id,lista: reorder(
                    this.props.allList[0].lista,
                    result.source.index,
                    result.destination.index
                    )};//estado
                
                
                } else {
                    lista = {id: this.props.allList[1].id,lista: reorder(
                        this.props.allList[1].lista,
                        result.source.index,
                        result.destination.index
                    )};//estado
                
                }
                this.props.handlerUpdateList(lista);*/          
          
        }
      }
    MenuFile() {
        return(<Menu theme="light">
            <Menu.Item key="nwfile" onClick={this.props.handlerAdd}><Icon type="file" /> Nuevo Archivo</Menu.Item>
            <Menu.Item key="opfile" onClick={() => this.props.handlerDialogOpenFile(true)}>
                <Icon type="upload" /> Abrir archivo
            </Menu.Item>
            <Menu.Item key="svsave" onClick={()=>{this.props.handlerDownloadFile(this.props.currentFile, this.props.files)}}>
                <Icon type="download" /> Descargar Archivo
            </Menu.Item>
        </Menu>);
    }
    MenuEdit(){
        return(<Menu theme="light">
            <Menu.Item key="undo">Deshacer</Menu.Item>
            <Menu.Item key="redo">Rehacer</Menu.Item>
            <Menu.Item key="cut">Cortar</Menu.Item>
            <Menu.Item key="copy">Copiar</Menu.Item>
            <Menu.Item key="paste">Pegar</Menu.Item>
        </Menu>);
    }
    MenuSelection(){
        return(<Menu theme="light">
            <Menu.Item key="slc">Seleccionar todo</Menu.Item>
        </Menu>);
    }
    MenuHelp(){
        return(<Menu theme="light">
            <Menu.Item key="docu">Documentation</Menu.Item>
            <Menu.Item key="about">Acerca de Editor de Arquetipos</Menu.Item>
        </Menu>);
    }
    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }
    render(){
        return (
            <div>
                <Modal
                    title="Abrir Archivo"
                    centered
                    visible={this.props.dialogOpenFile}
                    onOk={() => this.props.handlerDialogOpenFile(false)}
                    onCancel={() => this.props.handlerDialogOpenFile(false)}
                >
                    <DropZone />
                </Modal>
                <Layout>
                    <Row className="nav-bar">
                        <Icon type="fire" />
                        <Dropdown overlay={ this.MenuFile } trigger={['click']}>
                            <Button type="link" ghost>
                                Archivo
                            </Button>
                        </Dropdown>
                        <Dropdown overlay={ this.MenuEdit } trigger={['click']}>
                            <Button type="link" ghost>
                                Editar
                            </Button>
                        </Dropdown>
                        <Dropdown overlay={ this.MenuSelection } trigger={['click']}>
                            <Button type="link" ghost>
                                Seleccion
                            </Button>
                        </Dropdown>
                        <Dropdown overlay={ this.MenuHelp} trigger={['click']}>
                            <Button type="link" ghost>
                                Ayuda
                            </Button>
                        </Dropdown>
                    </Row>
                </Layout>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div>
                    <Layout>
                        <Sider collapsible onClick={this.toggle} style={{ minHeight: '100vh' }}>
                            <Menu
                                theme="dark"
                                mode="inline"
                            >
                                <SubMenu
                                    key="cap1"
                                    title={
                                        <span>
                                            <Icon type="folder" />
                                            <span>Carpeta 1</span>
                                        </span>
                                    }
                                >
                                    <Menu.Item key="1">Archetype 1</Menu.Item>
                                    <Menu.Item key="2">Archetype 2</Menu.Item>
                                    <Menu.Item key="3">Archetype 3</Menu.Item>
                                    <Menu.Item key="4">Archetype 4</Menu.Item>
                                </SubMenu>
                                <SubMenu
                                    key="cap2"
                                    title={
                                    <span>
                                        <Icon type="folder" />
                                        <span>Carpeta 2</span>
                                    </span>
                                    }
                                >
                                    <Menu.Item key="5">Archetype 1</Menu.Item>
                                    <Menu.Item key="6">Archetype 2</Menu.Item>
                                    <Menu.Item key="7">Archetype 3</Menu.Item>
                                    <Menu.Item key="8">Archetype 4</Menu.Item>
                                </SubMenu>
                                <SubMenu
                                    key="Blocks"
                                    title={
                                    <span>
                                        <Icon type="block" />
                                        <span>Bloques</span>
                                    </span>
                                    }
                                >
                                    <Droppable droppableId="Lista0">
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                style={getListStyle(snapshot.isDraggingOver)}>
                                                {this.props.sampleList.lista.map((item, index) => (
                                                    <Draggable key={`list1-${item.id}`} draggableId={item.id} index={index}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={getItemStyle(
                                                                    snapshot.isDragging,
                                                                    provided.draggableProps.style
                                                            )}>
                                                                
                                                                {item.content}

                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                
                                                {provided.placeholder}
                                                
                                            </div>
                                        )}
                                    </Droppable>
                                    
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Layout>
                            <Content>
                                <FileManager>
                                     
                                </FileManager>
                                
                            </Content>
                            <Footer style={{ textAlign: 'center' }}>
                                Archetypes ©2019 Created by WorkOrWate
                            </Footer>
                        </Layout>
                    </Layout>
                    </div>
                </DragDropContext>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        title: state.title,
        dialogOpenFile: state.dialogOpenFile,
        currentFile: state.currentFile,
        files: state.files,
        sampleList:state.sampleList
    };
}

const mapDispatchToProps = dispatch => {
    return {
        handlerAdd(){
            dispatch(onEdit('add'));
        },
        handlerChangeTitle(newtitle) {
            dispatch(changeTitle(newtitle));
        },
        handlerDialogOpenFile(modalState) {
            dispatch(toggleOpenFileDialog(modalState));
        },
        handlerDownloadFile(file, files) {
            handlerDownload(dispatch, file, files)
        },
        handlerUpdateList(blocklist){
            dispatch(updateblocklist(blocklist));
        }

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);