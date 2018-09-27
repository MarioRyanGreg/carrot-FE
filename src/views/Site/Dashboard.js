import React, { Component } from 'react';
import {
    Avatar,
    Card,
    Col,
    Icon,
    Row
} from 'antd';
import { getUserProfile } from '../../controllers/auth';

const { Meta } = Card;

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
        this.loadUserProfile = this.loadUserProfile.bind(this);
    }

    componentDidMount() {
        this.loadUserProfile();
    }

    loadUserProfile() {

        getUserProfile()
            .then(response => {
                this.setState({
                    user: response
                });
            }).catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div style={{ padding: '30px' }}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card
                            // style={{ width: 300 }}
                            // cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                            actions={[
                                <span><Icon type="setting" /> VIEW PROFILE</span>
                            ]}
                        >
                            <Meta
                                avatar={<Avatar src="https://cdn.iconscout.com/icon/premium/png-96-thumb/user-787-133293.png" size={64} />}
                                title={this.state.user ? this.state.user.name : 'Hallo'}
                                description={this.state.user ? `@${this.state.user.username}` : 'Mitrais Employee'}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            // style={{ width: 300 }}
                            // cover={<img alt="example" src="https://cdn.iconscout.com/icon/premium/png-256-thumb/carrot-43-136270.png" />}
                            actions={[
                                <span><Icon type="setting" /> SHARE CARROT</span>
                            ]}
                        >
                            <Meta
                                avatar={<Avatar src="https://cdn.iconscout.com/icon/premium/png-96-thumb/carrot-97-221767.png" size={64} />}
                                title="You've earned 560 carrots!"
                                description="Show your details transactions"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            // style={{ width: 300 }}
                            // cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                            actions={[
                                <span><Icon type="setting" /> VIEW HISTORY</span>
                            ]}
                        >
                            <Meta
                                avatar={<Avatar src="https://cdn.iconscout.com/icon/premium/png-96-thumb/cloud-2247-330488.png" size={64} />}
                                title="Carrots Transaction History"
                                description="Show your details transactions"
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Dashboard;

