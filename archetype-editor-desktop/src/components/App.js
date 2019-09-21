import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';
import { connect } from 'react-redux';
const { $, electron } = window;

//import { DatePicker } from 'antd';

const About = () => <h2>About</h2>;

class App extends Component {
  constructor(props) {
    super(props);
        
    this.state = {
      sidebar: true,
      app: {
        isMaximized: false,
        set: function (state, callback) {
          const { set, electron, ...app } = this.state.app;
          this.setState(
            {
              app: { ...app, ...state, set, electron }
            },
            callback
          )
        }.bind(this),
        electron,
      }
    } 
  }
  componentWillMount(){
    this.props.setElectron(electron);
    const { ipcRenderer } = this.state.app.electron;
    ipcRenderer.on('mainWindow:isMaximized', (event, isMaximized) => {
      this.state.app.set({ isMaximized });
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
