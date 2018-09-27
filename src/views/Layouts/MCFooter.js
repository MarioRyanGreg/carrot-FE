import React, { Component } from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

class MCFooter extends Component {
    render() {
        return (
            <Footer style={{ textAlign: 'center' }}>
                Mitrais Carrot ©2018 Created by Team B
            </Footer>
        );
    }
}

export default MCFooter;

