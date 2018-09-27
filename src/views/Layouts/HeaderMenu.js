import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppIcon from '../../../public/img/mitrais-logo.png';
import {
    Layout,
    Menu
} from 'antd';

const { Header } = Layout;

class HeaderMenu extends Component {
    constructor(props) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick() {
        this.props.onLogout();
    }

    render() {
        return (
            <Header className="header">
                <img src={AppIcon} className="logo" style={{
                    width: '165px',
                    height: '30px',
                    margin: '16px 28px 16px 0',
                    float: 'left'
                }} />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    // defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px', float: 'right' }}
                >
                    <Menu.Item key="profile">
                        <Link to={`/profile`}>{this.props.currentUser.name}</Link>
                    </Menu.Item>
                    <Menu.Item key="logout" onClick={this.handleMenuClick}>
                        Logout
                    </Menu.Item>
                </Menu>
            </Header>
        );
    }
}

export default HeaderMenu;