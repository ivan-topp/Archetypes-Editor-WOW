import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeTitle, toggleOpenFileDialog } from '../actions/home';
import FileManager from './FileManager';
import DropZone from './DropZoneFile';
import { Modal, Button, Icon } from 'antd';

class Home extends Component {
    render(){
        return (
            <div>
                <h2>Welcome to { this.props.title }</h2>
                <Button type="primary" onClick={()=>{this.props.handlerChangeTitle('NewTitle')}}>Change Title</Button>
                <Button type="primary" onClick={()=>{this.props.handlerDownload(this.props.currentFile, this.props.files)}}><Icon type="download" />Donwload</Button>
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
        files: state.files
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
        handlerDownload(file, files) {
            if (file !== null && files.length > 0){
                const fileTarget = files.filter(ofile => ofile.key === file)[0];
                const element = document.createElement("a");
                const blob = new Blob([fileTarget.content], {type: 'text/plain'});
                element.href = URL.createObjectURL(blob);
                element.download = fileTarget.title;
                document.body.appendChild(element); // Required for this to work in FireFox
                element.click();
            }
        }
    }
}

  
export default connect(mapStateToProps, mapDispatchToProps)(Home);