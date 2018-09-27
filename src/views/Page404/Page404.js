import React, { Component } from 'react';
import {
    Avatar,
    Card,
    Icon
} from 'antd';

import './Page404.css';

class Page404 extends Component {

    render() {
        return (
            <div className="page-details">
                <div className="user-avatar">
                    <Avatar className="user-avatar-circle" src="https://cdn.iconscout.com/icon/premium/png-96-thumb/page-not-found-3-504949.png" size={96} />
                </div>
                <div className="summary">
                    <div className="error-text">404</div>
                    <div className="error-text">Page Not Found</div>
                </div>
            </div>
        );
    }
}

export default Page404;