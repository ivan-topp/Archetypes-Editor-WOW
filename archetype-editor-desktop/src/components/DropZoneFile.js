import React, { Component } from 'react'
import { connect } from 'react-redux';
import { openFile } from '../actions/DropZoneFile';
import { toggleOpenFileDialog } from '../actions/home';
import { feedBackMessage } from '../actions/others';
import { Icon } from 'antd';
import './DropZoneFile.css'

class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
    this.fileInputRef = React.createRef();

    this.openFileDialog = this.openFileDialog.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this)
  }

  openFileDialog(e) {
    //this.props.electron.ipcRenderer.send('fs:open');
    /*if (this.props.disabled) return;*/
    //console.log(e);
    this.fileInputRef.current.click();
  }

  onFilesAdded(evt) {
    if (this.props.disabled) return;
    const files = evt.target.files;
    
    const aFiles = this.fileListToArray(files);
    console.log(aFiles[0]);
    if(aFiles.length > 0){
        this.props.handlerAddFiles(aFiles, this.props.newTabIndex, this.props.files, this.fileInputRef);
    }
  }

  onDragOver(evt) {
    evt.preventDefault();
    if (this.props.disabled) return;
    this.setState({ hover: true });
  }

  onDragLeave() {
    this.setState({ hover: false });
  }

  onDrop(event) {
    event.preventDefault();
    if (this.props.disabled) return;
    const files = event.dataTransfer.files;
    const aFiles = this.fileListToArray(files);
    if(aFiles.length > 0){
        this.props.handlerAddFiles(aFiles, this.props.newTabIndex, this.props.files, this.fileInputRef);
    }
    this.setState({ hover: false });
  }

  fileListToArray(list) {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  }

  render() {
    return (
      <div
        className={`Dropzone ${this.state.hover ? 'hover' : ''}`}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.openFileDialog}
        style={{ cursor: this.props.disabled ? 'default' : 'pointer' }}
      >
        <input
          ref={this.fileInputRef}
          className="FileInput"
          type="file"
          accept=".json, .xml, .adl"
          multiple
          onChange={this.onFilesAdded}
        />
        <Icon type="inbox" />
        <span>Haz click o arrastra archivos a esta área para abrirlos</span>
      </div>
    )
  }
}

const mapStateToProps = state => {
    return{
        newTabIndex: state.newTabIndex,
        files: state.files,
        electron: state.electron
    };
}

const mapDispatchToProps = dispatch => {
    return {
        handlerAddFiles(aFiles, newTabIndex, files, ref) {
            if (window.FileReader) {
              aFiles.forEach(file => {
                try {
                  const ext = file.name.split('.').pop();
                  if (ext === 'adl' || ext === 'json' || ext === 'xml' ) {
                    const equalFiles = files.filter(ofile => ofile.title === file.name);
                    if (equalFiles.length <= 0) {
                      const reader = new FileReader();
                      const nFile = { title: '', content: '', path:'', saved: false, key: '0' };
                      nFile.key = (newTabIndex + 1).toString();
                      newTabIndex+=1;
                      nFile.title = file.name;
                      nFile.path = file.path;
                      reader.onload = (r)=>{
                        nFile.content = r.target.result;
                        files = files.concat(nFile);
                        dispatch(openFile(files, newTabIndex));
                      }
                      reader.readAsText(file, 'UTF-8');
                      feedBackMessage({ type: "success", msg: "El archivo " + file.name + " se cargó correctamente."});
                    } else {
                      feedBackMessage({ type: "warning", msg: "El archivo " + file.name + " no se cargó debido a que ya se encuentra en uso."});
                    }
                  }
                } catch (error) {
                  feedBackMessage({ type: "error", msg: "El archivo " + file.name + " no se pudo cargar."});
                  console.log(error);
                }
              });
              ref.current.value = null;
              dispatch(toggleOpenFileDialog(false));
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dropzone);