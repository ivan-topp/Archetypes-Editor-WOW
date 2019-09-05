import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeTitle, toggleOpenFileDialog } from '../actions/home';
import FileManager from './FileManager';
import { Modal, Button } from 'antd';

class Home extends Component {
    render(){
        return (
            <div>
                <h2>Welcome to { this.props.title }</h2>
                <Button type="primary" onClick={()=>{this.props.handlerChangeTitle('NewTitle')}}>Change Title</Button>
                <FileManager />
                <Link to="/about">About</Link>
                <Modal
                    title="Abrir Archivo"
                    centered
                    visible={this.props.dialogOpenFile}
                    onOk={() => this.props.handlerDialogOpenFile(false)}
                    onCancel={() => this.props.handlerDialogOpenFile(false)}
                >
                    <p>some contents...</p>
                    <p>some contents...</p>
                    <p>some contents...</p>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        title: state.title,
        dialogOpenFile: state.dialogOpenFile
    };
}

const mapDispatchToProps = dispatch => {
    return {
        handlerChangeTitle(newtitle) {
            dispatch(changeTitle(newtitle));
        },
        handlerDialogOpenFile(modalState) {
            dispatch(toggleOpenFileDialog(modalState));
        }
    }
}

  
export default connect(mapStateToProps, mapDispatchToProps)(Home);