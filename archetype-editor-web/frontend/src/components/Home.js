import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeTitle } from '../actions/home';
import { Button,Layout, Menu, Breadcrumb, Icon, Dropdown,notification} from 'antd';
/*import Board from './Board'*/
/*import Card from './Cards'*/
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider} = Layout;
const ButtonGroup = Button.Group;


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
        this.state = {collapsed:false};
}
    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }
    render(){
        return (
            <div>
                <h2>Welcome to { this.props.title }</h2>
                <Button type="primary" onClick={()=>{this.props.handlerChangeTitle('NewTitle')}}>Change Title</Button>
                <Link to="/about">About</Link>
                <Layout >
                    <Menu theme="dark" mode="inline">
                        <Icon type="fire" />
                        <Dropdown overlay={MenuFile} trigger={['click']}>
                            <Button type="link" ghost>
                                File
                            </Button>
                        </Dropdown>
                        
                        <Dropdown overlay={MenuEdit} trigger={['click']}>
                            <Button type="link" ghost>
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