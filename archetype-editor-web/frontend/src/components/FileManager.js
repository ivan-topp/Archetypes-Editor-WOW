import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addFile, toggleFile, onEdit } from '../actions/FileManager';
import { Tabs, Button } from 'antd';
const { TabPane } = Tabs;

class FileManager extends Component {

    render(){
        return (
            <div>
                <h1>Bienvenido al administrador de archivos</h1>
                <Tabs
                    
                    onChange={this.props.handlerToggle}
                    activeKey={this.props.currentFile}
                    type="editable-card"
                    onEdit={this.props.handlerEdit}
                >
                    {this.props.files.map(pane => (
                        <TabPane tab={pane.title} key={pane.key}>
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
        }
    }
}

  
export default connect(mapStateToProps, mapDispatchToProps)(FileManager);