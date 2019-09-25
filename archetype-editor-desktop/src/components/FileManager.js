import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleFile, onEdit, changeName, removeFile } from '../actions/FileManager';
import { toggleOpenFileDialog, handlerDownload, saveFile } from '../actions/home';
import { feedBackMessage } from '../actions/others';
import { Tabs, Icon, Typography, Modal } from 'antd';
import './FileManager.css';
const { TabPane } = Tabs;
const { Paragraph } = Typography;
const { confirm } = Modal;

class FileManager extends Component {

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
                            {pane.content}
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
                content: 'Haz realizado cambios en el archivo, ¿Deseas descargar el archivo antes de cerrarlo?',
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
        }
    }
}

  
export default connect(mapStateToProps, mapDispatchToProps)(FileManager);