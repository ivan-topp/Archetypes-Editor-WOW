import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeTitle, toggleOpenFileDialog, handlerDownload } from '../actions/home';
import FileManager from './FileManager';
import DropZone from './DropZoneFile';
import { Modal, Button, Icon } from 'antd';

class Home extends Component {
    render(){
        return (
            <div>
                <h2>Welcome to { this.props.title }</h2>
                <Button type="primary" onClick={()=>{this.props.handlerChangeTitle('NewTitle')}}>Change Title</Button>
                <Button type="primary" onClick={()=>{this.props.handlerDownloadFile(this.props.electron.ipcRenderer, this.props.currentFile, this.props.files)}}><Icon type="download" />Donwload</Button>
                <FileManager />
                <Link to="/about">About</Link>
                <Modal
                    title="Abrir Archivo"
                    centered
                    visible={this.props.dialogOpenFile}
                    onOk={() => this.props.handlerDialogOpenFile(false)}
                    onCancel={() => this.props.handlerDialogOpenFile(false)}
                >
                    <DropZone />
                </Modal>
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
        electron: state.electron
    };
}

const mapDispatchToProps = dispatch => {
    return {
        handlerChangeTitle(newtitle) {
            dispatch(changeTitle(newtitle));
        },
        handlerDialogOpenFile(modalState) {
            dispatch(toggleOpenFileDialog(modalState));
        },
        handlerDownloadFile(ipc, file, files) {
            handlerDownload(ipc, file, files);
        }   
    }
}

  
export default connect(mapStateToProps, mapDispatchToProps)(Home);