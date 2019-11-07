import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './Home';
const { electron } = window;

//import { DatePicker } from 'antd';

const About = () => <h2>About</h2>;

class App extends Component {
  constructor(props) {
    super(props);
        
    this.state = {
      isMaximized:false,
      } 
    } 
  
  componentWillMount(){
    this.props.setElectron(electron);
    const { ipcRenderer } = electron;
    ipcRenderer.on('mainWindow:isMaximized', (event, isMaximized) => {
      this.setState({ isMaximized });
    });
    ipcRenderer.send('mainWindow:isMaximized');
   }
  
   render(){
    return (
      <Home />
    );
  }
}

const mapStateToProps = state => {
  return {
      files: state.files,
      electron: state.electron
  };
}

const mapDispatchToProps = dispatch => {
  return {
      setElectron(electron) {
          dispatch({
            type: "setElectron",
            electron
          });
      }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
