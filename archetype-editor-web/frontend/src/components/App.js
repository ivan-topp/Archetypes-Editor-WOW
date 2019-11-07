import React, { Component } from 'react';
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
      <Home />
    );
  }
}

export default App;
