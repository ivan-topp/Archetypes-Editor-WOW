import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeTitle } from '../actions/home';
import { Button } from 'antd';

class Home extends Component {

    render(){
        return (
            <div>
                <h2>Welcome to { this.props.title }</h2>
                <Button type="primary" onClick={()=>{this.props.handlerChangeTitle('NewTitle')}}>Change Title</Button>
                <Link to="/about">About</Link>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        title: state.title
    };
}

const mapDispatchToProps = dispatch => {
    return {
        handlerChangeTitle(newtitle) {
            dispatch(changeTitle(newtitle));
        }
    }
}

  
export default connect(mapStateToProps, mapDispatchToProps)(Home);