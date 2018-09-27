import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

const { SubMenu } = Menu;
const { Sider } = Layout;

class SideMenu extends Component {
    constructor() {
        super();
        this.state = {
            collapsed: false,
        };
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                    mode="inline"
                    // defaultSelectedKeys={['1']}
                    defaultOpenKeys={['main']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <Menu.Item key="main">
                        <Icon type="home" /> Home
                        <Link to="/home"></Link>
                    </Menu.Item>
                    <SubMenu key="master" title={<span><Icon type="appstore" />Master</span>}>
                        <Menu.Item key="sharing-level">
                            <Link to="/sharing-levels"> Sharing Levels</Link>
                        </Menu.Item>
                        <Menu.Item key="sharing-types">
                            <Link to="/sharing-types"> Sharing Types</Link>
                        </Menu.Item>
                        <Menu.Item key="manager-rewards">
                            <Link to="/manager-rewards"> Manager Rewards</Link>
                        </Menu.Item>
                        <Menu.Item key="stockist-rewards">
                            <Link to="/stockist-rewards"> Stockist Rewards</Link>
                        </Menu.Item>
                        <Menu.Item key="roles">
                            <Link to="/roles"> Roles</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="stockist" title={<span><Icon type="laptop" />Farmer/Stockist</span>}>
                        <Menu.Item key="barns">
                            <Link to="/barns"> Barn</Link>
                        </Menu.Item>
                        <Menu.Item key="6">option6</Menu.Item>
                    </SubMenu>
                    <SubMenu key="merchant" title={<span><Icon type="shop" />Merchant</span>}>
                        <Menu.Item key="bazaar-item">
                            <Link to="/bazaar-items"> Bazaar Items</Link>
                        </Menu.Item>
                        <Menu.Item key="10">option10</Menu.Item>
                    </SubMenu>
                    <SubMenu key="manager" title={<span><Icon type="user" />Manager</span>}>
                        <Menu.Item key="9">option9</Menu.Item>
                        <Menu.Item key="10">option10</Menu.Item>
                    </SubMenu>
                    <SubMenu key="employee" title={<span><Icon type="usergroup-add" />Employee</span>}>
                        <Menu.Item key="9">option9</Menu.Item>
                        <Menu.Item key="10">option10</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        );
    }
}

export default SideMenu;