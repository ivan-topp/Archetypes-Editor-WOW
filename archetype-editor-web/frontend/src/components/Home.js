import React, { Component, Children } from 'react';
import { connect } from 'react-redux';
import { changeTitle, toggleOpenFileDialog, handlerDownload, openDbArchetype } from '../actions/home';
import { onEdit, updateblocklist } from '../actions/FileManager';
import FileManager from './FileManager';
import Scrollbar from './Scrollbar';
import DropZone from './DropZoneFile';
import { Button,Layout, Menu, Icon, Dropdown, Modal, Row, message } from 'antd';
import './Home.css';
import axios from 'axios';
import { feedBackMessage } from '../actions/others';
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
            <Menu.Divider />
            <Menu.Item key="saveInDB" onClick={(e)=>{this.props.handlerSaveInDB(this.props.currentFile, this.props.files);}}>
                <Icon type="database" /> Guardar actual en Base de datos
            </Menu.Item>
            <Menu.Item key="saveAllInDB" onClick={(e)=>{this.props.handlerSaveAllInDB(this.props.files);}}>
                <Icon type="database" /> Guardar todos en Base de datos
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
    componentWillMount(){
        this.props.getArchetypes(false);
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
                            <Scrollbar color="work">
                                <Menu
                                    theme="dark"
                                    mode="inline"
                                >
                                    <SubMenu
                                            key="cap2"
                                            title={
                                            <span>
                                                <Icon type="folder" />
                                                <span>Arquetipos</span>
                                            </span>
                                        }
                                    >
                                        <Menu.Item onClick={this.props.getArchetypes}>
                                            <Icon type="reload" /> Actualizar Lista
                                        </Menu.Item>
                                        {
                                            this.props.DBArchetypes.map((archetype, indx)=>(
                                                <Menu.Item key={ indx } onClick={(e)=>{this.props.handlerDBArchetypeClick(e, this.props.DBArchetypes);}}>{archetype.archetype_id.value}</Menu.Item>
                                            ))
                                        }
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
                            </Scrollbar>
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
        DBArchetypes: state.DBArchetypes,
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
        handlerSaveInDB(file, files){
            const fileTarget = files.filter(ofile => ofile.key === file)[0];
            if(navigator.onLine){
                if(fileTarget._id === '') {
                    axios.post('http://localhost:4000/api/archetype/', fileTarget.content, {
                        headers: {'Access-Control-Allow-Origin': '*'}
                    })
                    .then(response => {
                        console.log(response.data);
                        if(response.data.success){
                            fileTarget._id = response.data._id;
                            dispatch({
                                type: "updateFile",
                                file: fileTarget
                            });
                            feedBackMessage({ type: "success", msg: "El arquetipo se ha subido correctamente."});
                            this.getArchetypes();
                        } else {
                            feedBackMessage({ type: "error", msg: "Ya existe un arquetipo con ese nombre, por favor trabaja con el arquetipo encontrandolo en la lista."});
                        }
                        
                    })
                    .catch(e => {
                        feedBackMessage({ type: "error", msg: "Ha ocurrido un error al intentar guardar el arquetipo, comprueba tu conexión a internet."});
                        console.log(e);
                    });
                } else if (fileTarget._id !== '') {
                    axios.put('http://localhost:4000/api/archetype/', { _id : fileTarget._id, data: fileTarget.content})
                    .then(response => {
                        console.log(response.data);
                        feedBackMessage({ type: "success", msg: "El arquetipo se ha actualizado correctamente."});
                        this.getArchetypes();
                    })
                    .catch(e => {
                        feedBackMessage({ type: "error", msg: "Ha ocurrido un error al intentar guardar el arquetipo, comprueba tu conexión a internet."});
                        console.log(e);
                    });
                }
            }else{
                feedBackMessage({ type: "error", msg: "Al parecer no tienes conexión a internet."});
            }
            
            
        },
        handlerSaveAllInDB(files){
            files.map((file,  indx)=>{
                if(navigator.onLine){
                    if(file._id === '') {
                        axios.post('http://localhost:4000/api/archetype/', file.content, {
                            headers: {'Access-Control-Allow-Origin': '*'}
                        })
                        .then(response => {
                            console.log(response.data);
                            if(response.data.success){
                                file._id = response.data._id;
                                dispatch({
                                    type: "updateFile",
                                    file
                                });
                                feedBackMessage({ type: "success", msg: "El arquetipo se ha subido correctamente."});
                                this.getArchetypes();
                            } else {
                                feedBackMessage({ type: "error", msg: "Ya existe un arquetipo con ese nombre, por favor trabaja con el arquetipo encontrandolo en la lista."});
                            }
                        })
                        .catch(e => {
                            feedBackMessage({ type: "error", msg: "Ha ocurrido un error al intentar guardar el arquetipo, comprueba tu conexión a internet."});
                            console.log(e);
                        });
                    } else if (file._id !== '') {
                        axios.put('http://localhost:4000/api/archetype/', { _id : file._id, data: file.content})
                        .then(response => {
                            console.log(response.data);
                            feedBackMessage({ type: "success", msg: "El arquetipo se ha actualizado correctamente."});
                            this.getArchetypes();
                        })
                        .catch(e => {
                            feedBackMessage({ type: "error", msg: "Ha ocurrido un error al intentar guardar el arquetipo, comprueba tu conexión a internet."});
                            console.log(e);
                        });
                    }
                } else {
                    feedBackMessage({ type: "error", msg: "Al parecer no tienes conexión a internet."});
                }
                
            });
        },
        getArchetypes(feedback=true){
            if(navigator.onLine){
                return axios.get('http://localhost:4000/api/archetype/', {
                    headers: {'Access-Control-Allow-Origin': '*'}
                })
                .then(response => {
                    dispatch({
                        type: 'updateDBArchetypesVariable',
                        DBArchetypes: response.data
                    });
                })
                .catch(e => {
                    if(feedback){
                        feedBackMessage({ type: "error", msg: "Ha ocurrido un error al intentar contactar al servidor, comprueba tu conexión a internet."});
                    }
                });
            } else {
                feedBackMessage({ type: "error", msg: "Al parecer no tienes conexión a internet."});
            }
        },
        handlerDBArchetypeClick(e, DBArchetypes){
            dispatch(openDbArchetype(DBArchetypes[parseInt(e.key)]));
        },
        handlerUpdateList(blocklist){
            dispatch(updateblocklist(blocklist));
        }

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);