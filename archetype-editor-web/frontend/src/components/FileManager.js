import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addFile, toggleFile, onEdit, changeName } from '../actions/FileManager';
import { toggleOpenFileDialog } from '../actions/home';
import { Tabs, Button, Icon, Typography } from 'antd';
import './FileManager.css';
const { TabPane } = Tabs;
const { Paragraph } = Typography;

class FileManager extends Component {

    render(){
        return (
            <div>
                <h1>Bienvenido al administrador de archivos</h1>
                <Button type="primary" onClick={() => this.props.handlerDialogOpenFile(true)}>
                    <Icon type="upload" /> Abrir archivo
                </Button>
                <Tabs
                    
                    onChange={this.props.handlerToggle}
                    activeKey={this.props.currentFile}
                    type="editable-card"
                    onEdit={this.props.handlerEdit}
                >
                    {this.props.files.map((pane, indx) => (
                        <TabPane tab={<div><Paragraph className="display-inline" editable={{ onChange: str=>{this.props.handlerChangeName(str, pane.key, indx, this)} }}>{pane.title}</Paragraph><a className="close" onClick={() => this.props.handlerDialogOpenFile(true)}>X</a></div>} key={pane.key}>
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
        currentFile: state.currentFile
    };
}

const mapDispatchToProps = dispatch => {
    return {
        handlerToggle(activeKey) {
            dispatch(toggleFile(activeKey));
        },
        handlerEdit(targetKey, action){
            dispatch(onEdit(targetKey, action));
        },
        handlerDialogOpenFile(modalState) {
            dispatch(toggleOpenFileDialog(modalState));
        },
        handlerChangeName(newName, key, indx, tab){
            dispatch(changeName(newName, key, indx));
            tab.forceUpdate();
        }
    }
}

  
export default connect(mapStateToProps, mapDispatchToProps)(FileManager);