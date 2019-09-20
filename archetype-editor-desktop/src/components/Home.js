import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeTitle } from '../actions/home';
import { Button,Layout, Menu, Breadcrumb, Icon, Dropdown,notification} from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { func } from 'prop-types';
import './home.css';
import ButtonGroup from 'antd/lib/button/button-group';
/*import Board from './Board'*/
/*import Card from './Cards'*/

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider} = Layout;

//----------InicioDrag and drop---------------
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex',
  padding: grid,
  overflow: 'auto',
});
//----------finDrag and drop---------------
var winclose = function () {
    window.close();
}
var winmin = function(){
    window.minimize();
}

const NotificationSave = () => {
    notification.open({
      message: 'Se ha Guardado correctamente',
      description:
        'Su archivo esta esta en su sistema.',
    });
};

const MenuFile = (
    <Menu theme="dark">
        <Menu theme="dark">
            <Menu.Item key="nwfile">New File</Menu.Item>
            <Menu.Item key="opfile">OpenFile</Menu.Item>
            <Menu.Item key="svsave"  onClick={NotificationSave}>Save</Menu.Item>
            <Menu.Item key="svsaveas">Save As</Menu.Item>
            <Menu.Item key="quit">Exit</Menu.Item>
       </Menu>
    </Menu>
);
const MenuEdit = (
    <Menu theme="dark">
        <Menu theme="dark">
            <Menu.Item key="undo">Undo</Menu.Item>
            <Menu.Item key="redo">Redo</Menu.Item>
            <Menu.Item key="cut">Cut</Menu.Item>
            <Menu.Item key="copy">Copy</Menu.Item>
            <Menu.Item key="paste">Paste</Menu.Item>
       </Menu>
    </Menu>
);
const MenuSelection = (
    <Menu theme="dark">
        <Menu theme="dark">
            <Menu.Item key="slc">Select All</Menu.Item>
       </Menu>
    </Menu>
);
const MenuHelp = (
    <Menu theme="dark">
        <Menu theme="dark">
            <Menu.Item key="docu">Documentation</Menu.Item>
            <Menu.Item key="about">About</Menu.Item>
       </Menu>
    </Menu>
);


class Home extends Component {
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {collapsed:false,
            items: getItemStyle(6),
        };
        this.handlerWindowClose = this.handlerWindowClose.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }
    onDragEnd(result) {
    // dropped outside the list
        if (!result.destination) {
        return;
        }

        const items = reorder(
        this.state.items,
        result.source.index,
        result.destination.index
        );

        this.setState({
        items,
        });
    }
    handlerWindowClose(event) {
        event.preventDefault();
        const { ipcRenderer } = this.props.app.electron;
        ipcRenderer.send('mainWindow:close');
        event.stopPropagation();
    }
    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }
    render(){
        return (
            <div>
                <Layout id="baraction">
                    <Menu theme="dark" mode="inline" >
                        <ButtonGroup id="nomove1">
                            <Icon type="fire" />
                            <Dropdown overlay={MenuFile} trigger={['click']}>
                                <Button type="link" ghost>
                                    File
                                </Button>
                            </Dropdown>
                            
                            <Dropdown overlay={MenuEdit} trigger={['click']}>
                                <Button type="link" ghost >
                                    Edit
                                </Button>
                            </Dropdown>
                            
                            <Dropdown overlay={MenuSelection} trigger={['click']}>
                                <Button type="link" ghost>
                                    Selection
                                </Button>
                            </Dropdown>
                            <Dropdown overlay={MenuHelp} trigger={['click']}>
                                <Button type="link" ghost>
                                    Help
                                </Button>
                            </Dropdown>
                        </ButtonGroup>
                        
                        <ButtonGroup id="buttongroup">
                            <Button type="link" ghost  id="minimize">
                                    <svg aria-hidden="true" version="1.1" width="10" height="10">
                                    <path fill="currentColor" d="M 0,5 10,5 10,6 0,6 Z" />
                                    </svg>
                            </Button>
                            <Button type="link" id="maximize">
                                ❐
                            </Button>
                            <Button type="danger" onClick={winclose}>
                                    x
                            </Button>
                        </ButtonGroup>
                    </Menu>
                </Layout>
                
                
                <Layout>
                    <Sider collapsible onClick={this.toggle} style={{ minHeight: '100vh' }}>
                        <Menu
                        theme="dark"
                        mode="inline">
                            <SubMenu
                                key="cap1"
                                title={
                                    <span>
                                        <Icon type="folder" />
                                        <span>Carpeta 1</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="1">Archetype 1</Menu.Item>
                                <Menu.Item key="2">Archetype 2</Menu.Item>
                                <Menu.Item key="3">Archetype 3</Menu.Item>
                                <Menu.Item key="4">Archetype 4</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="cap2"
                                title={
                                <span>
                                    <Icon type="folder" />
                                    <span>Carpeta 2</span>
                                </span>
                                }
                            >
                                <Menu.Item key="5">Archetype 1</Menu.Item>
                                <Menu.Item key="6">Archetype 2</Menu.Item>
                                <Menu.Item key="7">Archetype 3</Menu.Item>
                                <Menu.Item key="8">Archetype 4</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="Blocks"
                                title={
                                <span>
                                    <Icon type="block" />
                                    <span>Bloques</span>
                                </span>
                                }
                            >
                                <Menu.Item key="block1">Bloque1</Menu.Item>
                                
                                
                            </SubMenu>
                        </Menu>
                    </Sider>
                    
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }} >
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                defaultSelectedKeys={['1']}
                                style={{ lineHeight: '64px' }}
                            >
                                <Menu.Item key="1">Archetype1</Menu.Item>
                                <Menu.Item key="2">Archetype2</Menu.Item>
                            </Menu>
                        </Header>
                        
                        <Content style={{ margin: '12px 12px ' }}>
                            <Layout style={{ padding: 24, background: '#fff', minHeight: '100vh' }}>
                                Workspace
                            </Layout>

                        </Content>
                        
                        <Footer style={{ textAlign: 'center' }}>
                            Archetypes ©2019 Created by WorkOrWate
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        title: state.title,
        electron: state.electron
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