import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleFile, onEdit, changeName, removeFile,updateblocklist } from '../actions/FileManager';
import { handlerDownload } from '../actions/home';
import { Tabs, Icon, Typography, Modal, Row, Col,Layout } from 'antd';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import './FileManager.css';
import { parse } from 'querystring';
import './Home.css';
const { TabPane } = Tabs;
const { Paragraph } = Typography;
const { confirm } = Modal;
//Diseño de los bloques y si el bloque es agarrado 
const grid = 6;
const getItemStyle = (isDragging,draggableStyle ) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`, 
    
  background: isDragging ? "#6188C0" : "#6188C0", 
  ...draggableStyle

  
});

//Estilo del fondo del bloque
const getListStyle = isDraggingOver => ({
background: isDraggingOver ? "none" : "lightgrey",
padding: grid,
width: 190
});
class FileManager extends Component {
    onDragEnd(result) {
        
        if (!result.destination) {
          return;
        }
    
        if (result.source.droppableId !== result.destination.droppableId) {
            let itemToMove;
            let allList = this.props.allList;
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
                itemToMove = {id:itemToMove.id + this.props.currentFile + "Copia",content:itemToMove.content +this.props.currentFile+ "Copia",type:itemToMove.type}; 
                //itemToMove = allList[0].lista.splice(result.source.index, 1)[0];
                const destinationlist = allList.filter(list => list.id === result.destination.droppableId)[0];
                // const originlist = allList.filter(list => list.id === result.source.droppableId)[0];
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
    
    render(){
        return (
            <div className="file-manager">
                <Tabs
                    onChange={this.props.handlerToggle}
                    activeKey={this.props.currentFile}
                    type="editable-card"
                    onEdit={this.props.handlerEdit}
                >
                    {this.props.files.map((pane, indx) => (
                        <TabPane className="tab-content" tab={
                            <div>
                                <Paragraph className="display-inline" editable={{ onChange: str=>{this.props.handlerChangeName(str, pane.key, indx, this)} }}>{pane.title}
                                </Paragraph>
                                <Icon type="close" className="close" onClick={(e)=>{this.props.showConfirm(e, this.props.currentFile, this.props.files)}}/>
                            </div>} key={pane.key}>
                            {console.log(pane.content)}
                            <Layout >
                                
                                    <Row className="Fila">
                                        <Col span={8} >
                                            <Droppable droppableId={"Lista1" + this.props.currentFile}>
                                                {(provided, snapshot) => (
                                                    <div>
                                                        <div >
                                                            <h6>Descripcion 0</h6>
                                                        </div>
                                                        <div
                                                            ref={provided.innerRef}
                                                            style={getListStyle(snapshot.isDraggingOver)}>
                                                            {
                                                                this.props.files.filter(file=>file.key===this.props.currentFile)[0].allList[0].lista.map((item, index) => (
                                                                
                                                                <Draggable key={`list2-${item.id}-${this.props.currentFile}`} draggableId={item.id} index={index}>
                                                                    
                                                                    {(provided, snapshot) => (
                                                                        <div>
                                                                            
                                                                            <div
                                                                                ref={provided.innerRef}
                                                                                style={getItemStyle(
                                                                                    provided.draggableProps.style,
                                                                                    snapshot.isDragging
                                                                                )}
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                            >
                                                                                {item.content}
                                                                            </div>
                                                                            {provided.placeholder}
                                                                        </div>
                                                                    )}
                                                                </Draggable>
                                                            ))}
                                                            
                                                            {provided.placeholder}
                                                        </div>
                                                    </div>
                                                )}
                                            </Droppable>
                                        </Col>
                                        <Col span={8}>
                                            <h1>POTO</h1>
                                        </Col>
                                        <Col span={8}>
                                            <Droppable droppableId={"Lista3" + this.props.currentFile}  >
                                                {(provided, snapshot) => (
                                                    
                                                    <div>
                                                        <div>
                                                            <h6>Descripcion 2</h6>
                                                        </div>
                                                        <div
                                                            ref={provided.innerRef}
                                                            style={getListStyle(snapshot.isDraggingOver)}>
                                                            {this.props.files.filter(file=>file.key===this.props.currentFile)[0].allList[2].lista.map((item, index) => (
                                                                
                                                                <Draggable key={`list4-${item.id}-${this.props.currentFile}`} draggableId={item.id} index={index}>
                                                                    {(provided, snapshot) => (
                                                                        <div>
                                                                            <div
                                                                                ref={provided.innerRef}
                                                                                style={getItemStyle(
                                                                                    provided.draggableProps.style,
                                                                                    snapshot.isDragging
                                                                                )}
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                            >
                                                                                {item.content}
                                                                            </div>
                                                                            {provided.placeholder}
                                                                        </div>
                                                                    )}
                                                                </Draggable>
                                                            ))}
                                                            
                                                            {provided.placeholder}
                                                        </div>
                                                    </div>
                                                )}
                                            </Droppable>
                                        </Col>
                                    </Row>
                                    <Row className="Fila">
                                        <Col span={8}>
                                        <Droppable  droppableId={"Lista2" + this.props.currentFile}  >
                                                {(provided, snapshot) => (
                                                    
                                                    <div>
                                                        <div>
                                                            <h6>Descripcion 1</h6>
                                                        </div>
                                                        <div
                                                            ref={provided.innerRef}
                                                            style={getListStyle(snapshot.isDraggingOver)}>
                                                            {this.props.files.filter(file=>file.key===this.props.currentFile)[0].allList[1].lista.map((item, index) => (
                                                                
                                                                <Draggable key={`list3-${item.id}-${this.props.currentFile}`} draggableId={item.id} index={index}>
                                                                    {(provided, snapshot) => (
                                                                        <div>
                                                                            <div
                                                                                ref={provided.innerRef}
                                                                                style={getItemStyle(
                                                                                    provided.draggableProps.style,
                                                                                    snapshot.isDragging
                                                                                )}
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                            >
                                                                                {item.content}
                                                                            </div>
                                                                            {provided.placeholder}
                                                                        </div>
                                                                    )}
                                                                </Draggable>
                                                            ))}
                                                            
                                                            {provided.placeholder}
                                                        </div>
                                                    </div>
                                                )}
                                            </Droppable>
                                        </Col>
                                        <Col span={8} >
                                        <h1>CACA</h1>
                                        </Col>
                                        <Col span={8}>
                                            <Droppable  droppableId={"Lista5" + this.props.currentFile}  >
                                                    {(provided, snapshot) => (
                                                        
                                                        <div>
                                                            <div>
                                                                <h6>Descripcion 4</h6>
                                                            </div>
                                                            <div
                                                                ref={provided.innerRef}
                                                                style={getListStyle(snapshot.isDraggingOver)}>
                                                                {this.props.files.filter(file=>file.key===this.props.currentFile)[0].allList[4].lista.map((item, index) => (
                                                                    
                                                                    <Draggable key={`list6-${item.id}-${this.props.currentFile}`} draggableId={item.id} index={index}>
                                                                        {(provided, snapshot) => (
                                                                            <div>
                                                                                <div
                                                                                    ref={provided.innerRef}
                                                                                    style={getItemStyle(
                                                                                        provided.draggableProps.style,
                                                                                        snapshot.isDragging
                                                                                    )}
                                                                                    {...provided.draggableProps}
                                                                                    {...provided.dragHandleProps}
                                                                                >
                                                                                    {item.content}
                                                                                </div>
                                                                                {provided.placeholder}
                                                                            </div>
                                                                        )}
                                                                    </Draggable>
                                                                ))}
                                                                
                                                                {provided.placeholder}
                                                            </div>
                                                        </div>
                                                    )}
                                                </Droppable>       
                                            </Col>
                                    </Row>
                                    <Row className="Fila">
                                        <Col span={8}>
                                            <Droppable  droppableId={"Lista4" + this.props.currentFile}  >
                                                {(provided, snapshot) => (
                                                    
                                                    <div>
                                                        <div>
                                                            <h6>Descripcion 3</h6>
                                                        </div>
                                                        <div
                                                            ref={provided.innerRef}
                                                            style={getListStyle(snapshot.isDraggingOver)}>
                                                            {this.props.files.filter(file=>file.key===this.props.currentFile)[0].allList[3].lista.map((item, index) => (
                                                                
                                                                <Draggable key={`list5-${item.id}-${this.props.currentFile}`} draggableId={item.id} index={index}>
                                                                    {(provided, snapshot) => (
                                                                        <div>
                                                                            <div
                                                                                ref={provided.innerRef}
                                                                                style={getItemStyle(
                                                                                    provided.draggableProps.style,
                                                                                    snapshot.isDragging
                                                                                )}
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                            >
                                                                                {item.content}
                                                                            </div>
                                                                            {provided.placeholder}
                                                                        </div>
                                                                    )}
                                                                </Draggable>
                                                            ))}
                                                            
                                                            {provided.placeholder}
                                                        </div>
                                                    </div>
                                                )}
                                            </Droppable>                                       
                                        </Col>
                                        <Col span={8}>
                                            <h1>PICHI</h1>
                                        </Col>
                                        <Col span={8}>
                                            <Droppable  droppableId={"Lista6" + this.props.currentFile}  >
                                                {(provided, snapshot) => (
                                                    
                                                    <div>
                                                        <div>
                                                            <h6>Descripcion 5</h6>
                                                        </div>
                                                        <div
                                                            ref={provided.innerRef}
                                                            style={getListStyle(snapshot.isDraggingOver)}>
                                                            {this.props.files.filter(file=>file.key===this.props.currentFile)[0].allList[5].lista.map((item, index) => (
                                                                
                                                                <Draggable key={`list7-${item.id}-${this.props.currentFile}`} draggableId={item.id} index={index}>
                                                                    {(provided, snapshot) => (
                                                                        <div>
                                                                            <div
                                                                                ref={provided.innerRef}
                                                                                style={getItemStyle(
                                                                                    provided.draggableProps.style,
                                                                                    snapshot.isDragging
                                                                                )}
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                            >
                                                                                {item.content}
                                                                            </div>
                                                                            {provided.placeholder}
                                                                        </div>
                                                                    )}
                                                                </Draggable>
                                                            ))}
                                                            
                                                            {provided.placeholder}
                                                        </div>
                                                    </div>
                                                )}
                                            </Droppable>
                                        </Col>
                                    </Row>                                                  
                                </Layout>
                        </TabPane>
                    ))}
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        newTabIndex: state.newTabIndex,
        files: state.files,
        currentFile: state.currentFile,
        sampleList:state.sampleList
    };
}

const mapDispatchToProps = dispatch => {
    return {
        handlerToggle(activeKey) {
            dispatch(toggleFile(activeKey));
        },
        handlerEdit(targetKey, action){
            dispatch(onEdit(action));
        },
        handlerChangeName(newName, key, indx, tab){
            dispatch(changeName(newName, key, indx));
            tab.forceUpdate();
        },
        showConfirm(e, key, files) {
            confirm({
                title: 'Cuidado!',
                content: 'Haz realizado cambios en el archivo, ¿Deseas descargar el archivo antes de cerrarlo?',
                onOk() {
                    const fileTarget = files.filter(ofile => ofile.key === key)[0];
                    if(fileTarget && fileTarget.saved === false){
                        handlerDownload(dispatch, key, files);
                    }
                    dispatch(removeFile(key));
                },
                onCancel() {dispatch(removeFile(key));},
            });
        },
        handlerUpdateList(blocklist){
            dispatch(updateblocklist(blocklist));
        }
    }
}

  
export default connect(mapStateToProps, mapDispatchToProps)(FileManager);