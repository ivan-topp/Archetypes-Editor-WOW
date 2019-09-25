import React, { Component } from 'react';
import { Layout, Menu, Row, Icon, Input, Col, Typography } from 'antd';
import { InfraestructuraWeb } from './sections/InfraestructuraWeb';
import { InfraestructuraDesktop } from './sections/InfrestructuraDesktop';
import { Comenzando } from './sections/Comenzando';
import { AdministradorDeArchivos } from './sections/FileManager';
import { DropZoneFile } from './sections/DropZoneFile';
import { Homepage } from './sections/Homepage';
import { Appini } from './sections/Appini';
import './App.css';
import 'antd/dist/antd.css';
const { Title } = Typography;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      collapsed: false,
      content: Comenzando 
    }
    this.toggleContent = this.toggleContent.bind(this);
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  toggleContent = (event) => {
    console.log(event.item.props.children.length);
    if (event.item.props.children.length === 2) {
      if (event.item.props.children[1].props.children === "Comenzando") {
        this.setState({
          content: Comenzando
        });
      }
    } else if (event.item.props.children === "Aplicación Web") {
      this.setState({
        content: InfraestructuraWeb
      });
    } else if (event.item.props.children === "Aplicación Desktop") {
      this.setState({
        content: InfraestructuraDesktop
      });
    } else if (event.item.props.children === "Administrador de Archivos") {
      this.setState({
        content: AdministradorDeArchivos
      });
    }  else if (event.item.props.children === "Cargador de archivos") {
      this.setState({
        content: DropZoneFile
      });
    } else if (event.item.props.children === "Homepage"){
      this.setState({
        content: Homepage
      });
    }else if (event.item.props.children === "Appini"){
      this.setState({
        content: Appini
      });
    }
}

  render(){
    return (
      <div className="App">
        <Layout >
          <Sider 
              trigger={null}
              collapsible 
              collapsed={this.state.collapsed} 
              onCollapse= {this.toggleCollapsed}
              className="side-panel">
              <div className="logo" />
              <Menu
                defaultSelectedKeys={['1']} 
                mode="inline"
                theme="dark"
              >
                <Menu.Item key="1" onClick={this.toggleContent}>
                  <Icon type="pie-chart" />
                  <span>Comenzando</span>
                </Menu.Item>
                <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Infraestructura</span></span>}>
                  <Menu.Item key="2" onClick={this.toggleContent}>Aplicación Web</Menu.Item>
                  <Menu.Item key="3" onClick={this.toggleContent}>Aplicación Desktop</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="mail" /><span>Componentes</span></span>}>
                  <Menu.Item key="5" onClick={this.toggleContent}>Administrador de Archivos</Menu.Item>
                  <Menu.Item key="6" onClick={this.toggleContent}>Cargador de archivos</Menu.Item>
                  <Menu.Item key="7" onClick={this.toggleContent}>Homepage</Menu.Item>
                  <Menu.Item key="8" onClick={this.toggleContent}>Appini</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }}>
                <Row>
                  <Col span={2}>
                    <Icon
                      className="trigger"
                      type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                      onClick={this.toggleCollapsed}
                    />
                  </Col>
                  <Col span={22} className="menu-bar">
                    <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px'}}
                  >
                  <Menu.Item kay="1" disabled>
                    <Input.Search
                      className="search"
                      placeholder="input search text"
                      style={{ width: 200 }}
                      onSearch={value => console.log(value)}
                    />
                    </Menu.Item>
                  <Menu.Item key="2">nav 2</Menu.Item>
                  <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
                  </Col>
                </Row>
                
              </Header>
              <Content
                style={{
                  margin: '24px 16px',
                  padding: 24,
                  background: '#fff',
                  minHeight: 280,
                }}
              >
                <Title style={{ textAlign: 'center' }}>{this.state.content.title}</Title>
                {this.state.content.content}
              </Content>
            </Layout>
        </Layout>
        
      </div>
    );
  }
  
}

export default App;