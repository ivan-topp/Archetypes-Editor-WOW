import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleFile, onEdit, changeName, removeFile, updateblocklist, udateAllBlockList } from '../actions/FileManager';
import { toggleOpenFileDialog, handlerDownload, saveFile } from '../actions/home';
import { feedBackMessage } from '../actions/others';
import { Tabs, Icon, Typography, Modal, Row, Col,Layout, Tooltip,Popover,Input, Button } from 'antd';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Scrollbar from './Scrollbar';
import './FileManager.css';
const { TabPane } = Tabs;
const { Paragraph } = Typography;
const { confirm } = Modal;
const grid = 6;
const getItemStyle = (isDragging,draggableStyle ) => ({
    userSelect: "none",
    /*padding: grid * 5,
    marginTop: 10,
    marginLeft:20,
    marginRight:20,
    marginBottom:10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 30,
    border:"solid",*/
    background: isDragging ? "#6188C0" : "#6188C0", 
    ...draggableStyle
});

//Estilo del fondo del bloque
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightgrey" : "lightgrey",
    paddingTop: grid*5,
    paddingBottom: grid*5,
    marginTop: 10,
    marginLeft:20,
    marginRight:20,
    marginBottom:10,
    borderRadius: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 30,
    width: 190
});
class FileManager extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible:false
        };
    }
    hide = () => {
        this.setState({
          visible: false,
        });
      };
    
    handleVisibleChange = visible => {
        this.setState({ visible });
    };
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
                itemToMove = {id:itemToMove.id + this.props.currentFile + "+Copia",content:itemToMove.content +this.props.currentFile+ "Copia",type:itemToMove.type}; 
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
    componentWillMount(){
        this.props.electron.ipcRenderer.on('closeTab', (event, key) => {
            this.props.closeTab(key);
        });
        this.props.electron.ipcRenderer.on('fs:saveas', (event, path, filename, key) => {
            const files = this.props.files;
            const fileTarget = files.filter(ofile => ofile.key === key)[0];
            files[files.indexOf(fileTarget)].title = filename;
            files[files.indexOf(fileTarget)].path = path;
            this.props.callChangeTabTitle(filename, key, files.indexOf(fileTarget), this);
            this.props.callSaveFileSaved(fileTarget);
        });
        this.props.electron.ipcRenderer.on('fs:save', (event, path, filename) => {
            const files = this.props.files;
            const fileTarget = files.filter(ofile => ofile.title === filename)[0];
            this.props.callSaveFileSaved(fileTarget);
        });
        this.props.electron.ipcRenderer.on('log', (event, msg, fileTarget) => {
            feedBackMessage(msg);
        });
    }

    render(){
        return (
            <div className="file-manager">
                <Tabs ref="TabPanel"
                    onChange={this.props.handlerToggle}
                    activeKey={this.props.currentFile}
                    type="editable-card"
                    onEdit={this.props.handlerEdit}
                >
                    {this.props.files.map((pane, indx) => (
                        <TabPane  className="tab-content" tab={
                            <div>
                                <Paragraph className="display-inline" editable={{ onChange: str=>{this.props.handlerChangeName(str, pane.key, indx, this)} }}>{pane.title}
                                </Paragraph>
                                <Icon type="close" className="close" onClick={(e)=>{this.props.modalConfirm(e, this.props.currentFile, this.props.files, this.props.electron.ipcRenderer)}}/>
                            </div>} key={pane.key}>
                            <Scrollbar color="work">
                                <Layout >
                                        <Row type="flex" className="Fila" >
                                            <Col span={8} type="flex" >
                                                <Droppable droppableId={"Lista1" + this.props.currentFile}>
                                                    {(provided, snapshot) => (
                                                        <div >
                                                            <div >
                                                                <h6>State</h6>
                                                            </div>
                                                            
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    style={getListStyle(snapshot.isDraggingOver)}>
                                                                    {
                                                                        this.props.files.filter(file=>file.key===this.props.currentFile)[0].allList[0].lista.map((item, index) => (
                                                                        
                                                                        <Draggable key={`list2-${item.id}-${this.props.currentFile}`} draggableId={item.id} index={index}>
                                                                            
                                                                            {(provided, snapshot) => (
                                                                                <div>
                                                                                    <Tooltip title={item.type}>
                                                                                        <Popover
                                                                                        content={
                                                                                            <div>
                                                                                                <Row>
                                                                                                <Input size="small" defaultValue={item.content}  />
                                                                                                </Row>
                                                                                                <Row className="Save">
                                                                                                <Button size="small" className="Save" onClick={this.hide}>Guardar</Button>
                                                                                                </Row>
                                                                                            </div>
                                                                                        }
                                                                                        title={
                                                                                            <div>
                                                                                                Editar
                                                                                                <Button size="small"  type="danger" className="Cerrar" onClick={this.hide}>x</Button>
                                                                                                
                                                                                            </div>
                                                                                        }
                                                                                        trigger="click"
                                                                                        visible={this.state.visible}
                                                                                        onVisibleChange={this.handleVisibleChange}
                                                                                        >
                                                                                            <div className="bloque"
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
                                                                                        </Popover>
                                                                                    </Tooltip>
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
                                                
                                            </Col>
                                            <Col span={8} >
                                                <Droppable droppableId={"Lista3" + this.props.currentFile}  >
                                                    {(provided, snapshot) => (
                                                        
                                                        <div>
                                                            <div>
                                                                <h6>Data</h6>
                                                            </div>
                                                            
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    style={getListStyle(snapshot.isDraggingOver)}>
                                                                    {this.props.files.filter(file=>file.key===this.props.currentFile)[0].allList[2].lista.map((item, index) => (
                                                                    
                                                                        <Draggable key={`list4-${item.id}-${this.props.currentFile}`} draggableId={item.id} index={index}>
                                                                            {(provided, snapshot) => (
                                                                                <div >
                                                                                    <Tooltip title={item.type}>
                                                                                        <div className="bloque"
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
                                                                                    </Tooltip>
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
                                        
                                        <Row type="flex" className="Fila" >
                                            
                                            <Col span={8} >
                                            <Droppable  droppableId={"Lista2" + this.props.currentFile}  >
                                                    {(provided, snapshot) => (
                                                        
                                                        <div >
                                                            <div>
                                                                <h6>Protocol</h6>
                                                            </div>
                                                            
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    style={getListStyle(snapshot.isDraggingOver)}>
                                                                    {this.props.files.filter(file=>file.key===this.props.currentFile)[0].allList[1].lista.map((item, index) => (
                                                                        
                                                                        <Draggable key={`list3-${item.id}-${this.props.currentFile}`} draggableId={item.id} index={index}>
                                                                            {(provided, snapshot) => (
                                                                                <div>
                                                                                    <Tooltip title={item.type}>
                                                                                        <div className="bloque"
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
                                                                                    </Tooltip>
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
                                                <div className="title">
                                                    {
                                                        this.props.getArchetypeName(this.props.files, this.props.currentFile)
                                                    }
                                                </div>
                                            </Col>
                                            <Col span={8}>
                                                <Droppable  droppableId={"Lista5" + this.props.currentFile}  >
                                                        {(provided, snapshot) => (
                                                            
                                                            <div>
                                                                <div>
                                                                    <h6>Description</h6>
                                                                </div>
                                                                
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        style={getListStyle(snapshot.isDraggingOver)}>
                                                                        {this.props.files.filter(file=>file.key===this.props.currentFile)[0].allList[4].lista.map((item, index) => (
                                                                            
                                                                            <Draggable key={`list6-${item.id}-${this.props.currentFile}`} draggableId={item.id} index={index}>
                                                                                {(provided, snapshot) => (
                                                                                    <div>
                                                                                        <Tooltip title={item.type}>
                                                                                        <div className="bloque"
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
                                                                                        </Tooltip>
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
                                        <Row type="flex" className="Fila">
                                            <Col span={8} >
                                                <Droppable  droppableId={"Lista4" + this.props.currentFile}  >
                                                    {(provided, snapshot) => (
                                                        
                                                        <div>
                                                            <div>
                                                                <h6>Events</h6>
                                                            </div>
                                                            
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    style={getListStyle(snapshot.isDraggingOver)}>
                                                                    {this.props.files.filter(file=>file.key===this.props.currentFile)[0].allList[3].lista.map((item, index) => (
                                                                        
                                                                        <Draggable key={`list5-${item.id}-${this.props.currentFile}`} draggableId={item.id} index={index}>
                                                                            {(provided, snapshot) => (
                                                                                <div>
                                                                                    <Tooltip title={item.type}>
                                                                                    <div className="bloque"
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
                                                                                    </Tooltip>
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
                                            <Droppable  droppableId={"Lista7" + this.props.currentFile}  >
                                                {(provided, snapshot) => (
                                                    
                                                    <div>
                                                        <div>
                                                            <h6>Items</h6>
                                                        </div>
                                                        
                                                            <div
                                                                ref={provided.innerRef}
                                                                style={getListStyle(snapshot.isDraggingOver)}>
                                                                {this.props.files.filter(file=>file.key===this.props.currentFile)[0].allList[6].lista.map((item, index) => (
                                                                    
                                                                    <Draggable key={`list7-${item.id}-${this.props.currentFile}`} draggableId={item.id} index={index}>
                                                                        {(provided, snapshot) => (
                                                                            <div>
                                                                                <Tooltip title={item.type}>
                                                                                <div className="bloque"
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
                                                                                </Tooltip>
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
                                                <Droppable  droppableId={"Lista6" + this.props.currentFile}  >
                                                    {(provided, snapshot) => (
                                                        <div>
                                                            <div>
                                                                <h6>Attribution</h6>
                                                            </div>
                                                            
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    style={getListStyle(snapshot.isDraggingOver)}>
                                                                    {this.props.files.filter(file=>file.key===this.props.currentFile)[0].allList[5].lista.map((item, index) => (
                                                                        
                                                                        <Draggable key={`list7-${item.id}-${this.props.currentFile}`} draggableId={item.id} index={index}>
                                                                            {(provided, snapshot) => (
                                                                                <div>
                                                                                    <Tooltip title={item.type}>
                                                                                    <div className="bloque"
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
                                                                                    </Tooltip>
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
                                </Scrollbar>
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
        sampleList:state.sampleList,
        electron: state.electron
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
        handlerDialogOpenFile(modalState) {
            dispatch(toggleOpenFileDialog(modalState));
        },
        handlerChangeName(newName, key, indx, tab){
            dispatch(changeName(newName, key, indx));
            tab.forceUpdate();
        },
        modalConfirm(e ,key, files, ipc) {
            const fileTarget = files.filter(ofile => ofile.key === key)[0];
            if (fileTarget && fileTarget.saved === true) {
                this.closeTab(key);
            } else {
                this.showConfirm(key, files, ipc);
            }
        },
        closeTab(key){
            dispatch(removeFile(key));
        },
        showConfirm(key, files, ipc) {
            confirm({
                title: 'Cuidado!',
                content: 'Haz realizado cambios en el archivo, ¿Deseas guardar el archivo antes de cerrarlo?',
                okText: "Si, guardar cambios",
                cancelText: "No",
                onOk() {
                    const fileTarget = files.filter(ofile => ofile.key === key)[0];
                    if(fileTarget && fileTarget.saved === false){
                        handlerDownload(ipc, key, files, true);
                    }
                },
                onCancel() {dispatch(removeFile(key));},
            });
        },
        callChangeTabTitle(newName, key, indx, tab){
          dispatch(changeName(newName, key, indx));
          tab.forceUpdate();
        },
        callSaveFileSaved(fileTarget){
            dispatch(saveFile(fileTarget));
        },
        handlerUpdateList(blocklist){
            dispatch(updateblocklist(blocklist));
        },
        handlerUpdateAllList(blocklist){
            dispatch(udateAllBlockList(blocklist));
        },
        getDatas(files, currentFile){
            const archetype = files.filter(file=>file.key===currentFile)[0].content;
            const term_definitions = files.filter(file=>file.key===currentFile)[0].content.ontology.term_definitions;
            const code = files.filter(file=>file.key===currentFile)[0].content.concept;
            let description = [];
            let attribution = {};
            let items = [];
            let data = [];
            let protocol = [];
            let state = [];
            let events = [];

            description.keywords='';
            attribution.archetype_id = archetype.archetype_id.value;
            attribution.other_identification = 'Major version ID: ' + archetype.uid.value;
            attribution.original_author = '';
            attribution.current_custodian = '';
            attribution.other_contributors = '';
            attribution.translators = '';
            attribution.lincencing = '';
            


            for(var i=0; i<term_definitions.length;i++){
                if(term_definitions[i].language==='en'){
                    for(var x=0; x<term_definitions[i].items.items.length;x++){
                        if(term_definitions[i].items.items[x].code===code){
                            for(var j=0;j<term_definitions[i].items.items[x].items.items.length;j++){
                                if(term_definitions[i].items.items[x].items.items[j].id==='description'){
                                    description.concept_description = term_definitions[i].items.items[x].items.items[j].value;
                                }
                            }
                        }
                    }
                }
            }

            for(var i = 0; i<archetype.description.details.length;i++){
                if(archetype.description.details[i].language.code_string==='en'){
                    description.purpose = archetype.description.details[i].purpose;
                    description.use = archetype.description.details[i].use;
                    description.misuse = archetype.description.details[i].misuse;
                    for(var x=0;x<archetype.description.details[i].keywords.length;x++){
                        description.keywords+=archetype.description.details[i].keywords[x]+ ', '
                    }
                    attribution.lincencing = 'Copyright: ' + archetype.description.details[i].copyright + ',\n';
                }
            }

            for(var i=0;i<archetype.description.other_details.length;i++){
                if(archetype.description.other_details[i].id==='references'){
                    description.references = archetype.description.other_details[i].value;
                }else if(archetype.description.other_details[i].id==='MD5-CAM-1.0.1'){
                    attribution.other_identification +=', \n Canonical MD5 Hash: ' + archetype.description.other_details[i].value;
                }else if(archetype.description.other_details[i].id==='build_uid'){
                    attribution.other_identification +=', \n Build Uid: ' + archetype.description.other_details[i].value;
                }
                else if(archetype.description.other_details[i].id==='custodian_organisation'){
                    attribution.current_custodian +=', \n Custodian Organisation: ' + archetype.description.other_details[i].value;
                }else if(archetype.description.other_details[i].id==='custodian_namespace'){
                    attribution.current_custodian +=', \n Custodian Namespace: ' + archetype.description.other_details[i].value;
                }else if(archetype.description.other_details[i].id==='current_contact'){
                    attribution.current_custodian +=', \n Current Contact: ' + archetype.description.other_details[i].value;
                }else if(archetype.description.other_details[i].id==='licence'){
                    attribution.lincencing += 'Licence: ' + archetype.description.other_details[i].value;
                }
            }

            for(var i=0;i<archetype.description.original_author.length;i++){
                if(archetype.description.original_author[i].id==='name'){
                    attribution.original_author += ', \n Author name: ' + archetype.description.original_author[i].value;
                }else if(archetype.description.original_author[i].id==='organization'){
                    attribution.original_author += ', \n Organization: ' + archetype.description.original_author[i].value;
                }else if(archetype.description.original_author[i].id==='email'){
                    attribution.original_author += ', \n Email: ' + archetype.description.original_author[i].value;
                }else if(archetype.description.original_author[i].id==='date'){
                    attribution.original_author += ', \n Date originally authored: ' + archetype.description.original_author[i].value;
                }
            }
            
            for(var i=0;i<archetype.description.other_contributors.length;i++){
                attribution.other_contributors+=archetype.description.other_contributors[i]+ ', '
            }

            for(var i=0;i<archetype.translations.length;i++){
                if(archetype.translations[i].author.length>1){
                    attribution.translators += ', \n '+ archetype.translations[i].language.code_string + ': '+ archetype.translations[i].author[0].value;
                }
            }
            const archetype_type = archetype.definition.rm_type_name;
            if(archetype_type === 'OBSERVATION'){
                for(var i=0;i<archetype.definition.attributes.length;i++){
                    if(archetype.definition.attributes[i].rm_attribute_name==='data'){
                        for(var j=0;j<archetype.definition.attributes[i].children.attributes.children.length;j++){
                            
                            events = events.concat({
                                id: archetype.definition.attributes[i].children.attributes.children[j].node_id,
                                content: '',
                                type: 'Events'
                            });
                        }

                        for(var j=0;j<archetype.definition.attributes[i].children.attributes.children[0].attributes[0].children.attributes.children.length;j++){
                            data = data.concat({
                                id: archetype.definition.attributes[i].children.attributes.children[0].attributes[0].children.attributes.children[j].node_id,
                                content: '',
                                type: 'Data'
                            });
                        }
                        for(var j=0;j<archetype.definition.attributes[i].children.attributes.children[0].attributes[1].children.attributes.children.length;j++){
                            state = state.concat({
                                id: archetype.definition.attributes[i].children.attributes.children[0].attributes[1].children.attributes.children[j].node_id,
                                content: '',
                                type: 'State'
                            });
                        }
                    }else if(archetype.definition.attributes[i].rm_attribute_name==='protocol'){
                        for(var j=0;j<archetype.definition.attributes[i].children.attributes.children.length;j++){
                            
                            protocol = protocol.concat({
                                id: archetype.definition.attributes[i].children.attributes.children[j].node_id,
                                content: '',
                                type: 'Protocol'
                            });
                        }
                    }
                }
            }else if(archetype_type === 'EVALUATION'){
                for(var i=0;i<archetype.definition.attributes.length;i++){
                    if(archetype.definition.attributes[i].rm_attribute_name==='data'){
                        for(var j=0;j<archetype.definition.attributes[i].children.attributes.children.length;j++){
                            
                            data = data.concat({
                                id: archetype.definition.attributes[i].children.attributes.children[j].node_id,
                                content: '',
                                type: 'Data'
                            });
                        }

                    }else if(archetype.definition.attributes[i].rm_attribute_name==='protocol'){
                        for(var j=0;j<archetype.definition.attributes[i].children.attributes.children.length;j++){
                            
                            protocol = protocol.concat({
                                id: archetype.definition.attributes[i].children.attributes.children[j].node_id,
                                content: '',
                                type: 'Protocol'
                            });
                        }
                    }

                }
            }else if(archetype_type === 'CLUSTER'){
                for(var i = 0;i < archetype.definition.attributes.children.length;i++){
                    items = items.concat({
                        id: archetype.definition.attributes.children[i].node_id,
                        content: '',
                        type: 'Items'
                    });
                }
            }
            for(var i=0; i<term_definitions.length;i++){
                if(term_definitions[i].language==='en'){
                    for(var j=0;j<term_definitions[i].items.items.length;j++){
                        try {
                            for(var k=0;k<items.length;k++){
                                if(items[k].id===term_definitions[i].items.items[j].code){
                                    items[k].content= term_definitions[i].items.items[j].items.items[0].value;
                                }
                            }
                        } catch (error) {
                            continue
                        }
                        try {
                            for(var k=0;k<data.length;k++){
                                if(data[k].id===term_definitions[i].items.items[j].code){
                                    data[k].content= term_definitions[i].items.items[j].items.items[0].value;
                                }
                            }
                        } catch (error) {
                            continue
                        }
                        try {
                            for(var k=0;k<events.length;k++){
                                if(events[k].id===term_definitions[i].items.items[j].code){
                                    events[k].content= term_definitions[i].items.items[j].items.items[0].value;
                                }
                            }
                        } catch (error) {
                            continue
                        }
                        try {
                            for(var k=0;k<state.length;k++){
                                if(state[k].id===term_definitions[i].items.items[j].code){
                                    state[k].content= term_definitions[i].items.items[j].items.items[0].value;
                                }
                            }
                        } catch (error) {
                            continue
                        }
                        try {
                            for(var k=0;k<protocol.length;k++){
                                if(protocol[k].id===term_definitions[i].items.items[j].code){
                                    protocol[k].content= term_definitions[i].items.items[j].items.items[0].value;
                                }
                            }
                        } catch (error) {
                            continue
                        }

                    }
                }
            }

            let descriptionNew = [];
            let attributionNew = [];
            
            //concept_description
            descriptionNew = descriptionNew.concat({id:'concept_description', content: ('Concept description: '+description.concept_description), type:'Description'});
            //purpose
            descriptionNew = descriptionNew.concat({id:'purpose', content: ('Purpose: '+description.purpose), type:'Description'});
            //use
            descriptionNew = descriptionNew.concat({id:'use', content: ('Use: '+description.use), type:'Description'});
            //misuse
            descriptionNew = descriptionNew.concat({id:'misuse', content: ('Misuse: '+description.misuse), type:'Description'});
            //keywords
            descriptionNew = descriptionNew.concat({id:'keywords', content: ('Keywords: '+description.keywords), type:'Description'});
            //references
            descriptionNew = descriptionNew.concat({id:'references', content: ('References: '+description.references), type:'Description'});

            //Archetype Id
            attributionNew = attributionNew.concat({id:'archetype_id', content: ('Archetype ID: '+attribution.archetype_id), type:'Attribution'});
            //other identification
            attributionNew = attributionNew.concat({id:'other_identification', content: ('Other Identification: '+attribution.other_identification), type:'Attribution'});
            //original author
            attributionNew = attributionNew.concat({id:'original_author', content: ('Original author: '+attribution.original_author), type:'Attribution'});
            //current custodian
            attributionNew = attributionNew.concat({id:'current_custodian', content: ('Current custodian: '+attribution.current_custodian), type:'Attribution'});
            //other contributors
            attributionNew = attributionNew.concat({id:'other_contributors', content: ('Other contributors: '+attribution.other_contributors), type:'Attribution'});
            //translators
            attributionNew = attributionNew.concat({id:'translators', content: ('Translators: '+attribution.translators), type:'Attribution'});
            //licencing
            attributionNew = attributionNew.concat({id:'lincencing', content: ('Licencing: '+attribution.lincencing), type:'Attribution'});

            const allList= [
                {id:"Lista1" + currentFile,lista:state,type:"State"},
                {id:"Lista2" + currentFile,lista:protocol,type:"Protocol"},
                {id:"Lista3" + currentFile,lista:data,type:"Data"},
                {id:"Lista4" + currentFile,lista:events,type:"Events"},
                {id:"Lista5" + currentFile,lista:descriptionNew,type:"Description"},
                {id:"Lista6" + currentFile,lista:attributionNew,type:"Atributtion"},
                {id:"Lista7" + currentFile,lista:items,type:"Items"}
            ]
            this.handlerUpdateAllList(allList);

            return(allList);
        },
        getArchetypeName(files, currentFile){
            console.log(this.getDatas(files, currentFile));
            const term_definitions = files.filter(file=>file.key===currentFile)[0].content.ontology.term_definitions;
            const code = files.filter(file=>file.key===currentFile)[0].content.concept;
            for(var i=0; i<term_definitions.length;i++){
                if(term_definitions[i].language==='en'){
                    for(var x=0; x<term_definitions[i].items.items.length;x++){
                        if(term_definitions[i].items.items[x].code===code){
                            for(var j=0;j<term_definitions[i].items.items[x].items.items.length;j++){
                                if(term_definitions[i].items.items[x].items.items[j].id==='text'){
                                    return(term_definitions[i].items.items[x].items.items[j].value);
                                }
                            }
                        }
                    }
                }
            }
            return('Nuevo Archivo');
        }
    }
}

  
export default connect(mapStateToProps, mapDispatchToProps)(FileManager);