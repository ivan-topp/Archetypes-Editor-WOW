import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeTitle, toggleOpenFileDialog, handlerDownload } from '../actions/home';
import { onEdit } from '../actions/FileManager';
import FileManager from './FileManager';
import DropZone from './DropZoneFile';
import { Button,Layout, Menu, Icon, Dropdown, Modal, Row } from 'antd';
import './Home.css';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
const { SubMenu } = Menu;
const { Content, Footer, Sider} = Layout;
//-----------------------------------------------------------------------
//---------------------------Test----------------------------------------
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `items-${k + offset}`,
        content: `Bloque ${k + offset}`
    }));

// Reordenar el resultado
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

//Mover el elemento de la lista de origen a una lista destino.
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

//Diseño de los bloques y si el bloque es agarrado 
const grid = 6;
const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`, 
      
    background: isDragging ? "lightgreen" : "grey", 
    ...draggableStyle
});

//Estilo del fondo del bloque
const getListStyle = isDraggingOver => ({
  //background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 150
});
//---------------------------Fin del test--------------------------------
//-----------------------------------------------------------------------

class Home extends Component {
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            collapsed:false,
            items: getItems(4),
            selected: getItems(3,4)
        };
        this.MenuFile = this.MenuFile.bind(this);
        this.MenuHelp = this.MenuHelp.bind(this);
        this.MenuEdit = this.MenuEdit.bind(this);
        this.MenuSelection = this.MenuSelection.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }
    /*id2List = {
        droppable: 'items',
        droppable2: 'selected'
    };*/
    //para manejar multiples listas
    
    
    getList (id){
        this.state[this.id2List[id]];
    }
    onDragEnd (result) {
        const { source, destination } = result;
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'droppable2') {
                state = { selected: items };
            }

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                items: result.droppable,
                selected: result.droppable2
            });
        }
    }
    //Donde finaliza el bloque que funciona
    /*onDragEnd(result) {
        if (!result.destination) {
          return;
        }
    
        const items = reorder(
          this.state.items,
          result.source.index,
          result.destination.index
        );
    
        this.setState({
          items
        });
    }*/
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
                                    
                                    <Droppable droppableId="droppable">
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                style={getListStyle(snapshot.isDraggingOver)}>
                                                {this.state.items.map((item, index) => (
                                                    <Draggable
                                                        key={item.id}
                                                        draggableId={item.id}
                                                        index={index}>
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
                                <Layout>
                                
                                <Droppable droppableId="droppable2">
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            style={getListStyle(snapshot.isDraggingOver)}>
                                            {this.state.selected.map((item, index) => (
                                                <Draggable
                                                    key={item.id}
                                                    draggableId={item.id}
                                                    index={index}>
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
                                
                                </Layout>
                            </Content>
                            <Footer style={{ textAlign: 'center' }}>
                                Archetypes ©2019 Created by WorkOrWate
                            </Footer>
                        </Layout>
                    </Layout>
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
        files: state.files
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
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);