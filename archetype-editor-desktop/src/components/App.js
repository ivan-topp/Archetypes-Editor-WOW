import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';
import { connect } from 'react-redux';
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
      <BrowserRouter>
        <Route exact path="/" component={ Home } />
        <Route path="/about" component={ About } />
      </BrowserRouter>
    );
  }
}
const mapStateToProps = state => {
  return {
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
