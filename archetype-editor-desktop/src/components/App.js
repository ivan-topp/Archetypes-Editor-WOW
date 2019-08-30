import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';

//import { DatePicker } from 'antd';

const About = () => <h2>About</h2>;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
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

export default App;
