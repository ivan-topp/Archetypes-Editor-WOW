import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleFile, onEdit, changeName, removeFile } from '../actions/FileManager';
import { handlerDownload } from '../actions/home';
import { Tabs, Icon, Typography, Modal } from 'antd';
import './FileManager.css';
const { TabPane } = Tabs;
const { Paragraph } = Typography;
const { confirm } = Modal;

class FileManager extends Component {

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
                            {JSON.stringify(pane.content)}
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
        currentFile: state.currentFile
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
                okText: "Si, guardar cambios",
                cancelText: "No",
                onOk() {
                    const fileTarget = files.filter(ofile => ofile.key === key)[0];
                    if(fileTarget && fileTarget.saved === false){
                        handlerDownload(dispatch, key, files);
                    }
                    dispatch(removeFile(key));
                },
                onCancel() {dispatch(removeFile(key));},
            });
        }
    }
}

  
export default connect(mapStateToProps, mapDispatchToProps)(FileManager);