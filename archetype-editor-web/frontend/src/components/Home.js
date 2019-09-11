import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeTitle } from '../actions/home';
import { Button,Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider} = Layout;
const ButtonGroup =Button.Group;
class Home extends Component {


    render(){
        return (
            <div>
                <h2>Welcome to { this.props.title }</h2>
                <Button type="primary" onClick={()=>{this.props.handlerChangeTitle('NewTitle')}}>Change Title</Button>
                <Link to="/about">About</Link>
                <Menu theme="dark" mode="inline">
                    <Icon type="fire" />
                    <Button type="link" ghost>
                        File
                    </Button>
                    <Button type="link" ghost>
                        Edit
                    </Button>
                    <Button type="link" ghost>
                        Selection
                    </Button>
                    <Button type="link" ghost>
                        Help
                    </Button>
                </Menu>
                
                <Layout>
                <Sider width={200}>
                    <Menu
                    theme="dark"
                    mode="inline"
                    
                    style={{ height: '100%', borderRight: 0 }}
                    >
                        <SubMenu
                            key="cap1"
                            title={
                            <span>
                                <Icon type="arrow-down" />
                                Carpeta 1
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
                                <Icon type="arrow-down" />
                                Carpeta 2
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
                                <Icon type="arrow-down" />
                                Bloques
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
                        
                        <Content style={{ margin: '24px 16px 0' }}>
                            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Workspace</div>
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