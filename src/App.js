import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { Layout, Breadcrumb, notification } from 'antd';
import { ACCESS_TOKEN, APP_NAME } from './libs/Config';
import { getCurrentUser } from './controllers/auth';

//Layouts Components Pages
import SideMenu from './views/Layouts/SideMenu';
import HeaderMenu from './views/Layouts/HeaderMenu';
import MCFooter from './views/Layouts/MCFooter';

import LoadingIndicator from './views/common/Loader';

import Login from './views/user/login/Login';
import Signup from './views/user/signup/Signup';

import CarrotRouters from './libs/Routes';

const { Content } = Layout;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        notification.config({
            placement: 'topRight',
            top: 70,
            duration: 3,
        });
    }

    loadCurrentUser() {
        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    isAuthenticated: true,
                    isLoading: false
                });
            }).catch(error => {
                this.setState({
                    isLoading: false
                });
            });
    }

    componentWillMount() {
        this.loadCurrentUser();
    }

    handleLogout(redirectTo = "/login", notificationType = "success", description = "You're successfully logged out.") {
        localStorage.removeItem(ACCESS_TOKEN);

        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

        this.props.history.push(redirectTo);

        notification[notificationType]({
            message: APP_NAME,
            description: description,
        });
    }

    handleLogin() {
        notification.success({
            message: APP_NAME,
            description: "You're successfully logged in.",
        });
        this.loadCurrentUser();
        this.props.history.push("/home");
    }

    render() {
        if (this.state.isLoading) {
            return <LoadingIndicator />
        }
        if (this.state.isAuthenticated) {
            return (
                <AuthenticatedLayout
                    isAuthenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    handleLogout={this.handleLogout} />
            );
        } else {
            return (
                <NotAuthenticatedLayout
                    isAuthenticated={this.state.isAuthenticated}
                    handleLogin={this.handleLogin} />
            )
        }
    }
}

class NotAuthenticatedLayout extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Layout style={{ background: '#fff', padding: 80, margin: 0, minHeight: 800 }}>
                <Switch>
                    <Route exact path="/" render={(props) =>
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location }
                            }}
                        />
                    } />
                    <Route exact path="/login" render={(props) => <Login onLogin={this.props.handleLogin} {...props} />}></Route>
                    <Route exact path="/signup" component={Signup}></Route>
                </Switch>
            </Layout>
        )
    }
}

class AuthenticatedLayout extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Layout>
                <HeaderMenu isAuthenticated={this.props.isAuthenticated}
                    currentUser={this.props.currentUser}
                    onLogout={this.props.handleLogout} />
                <Layout>
                    <SideMenu />
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 700 }}>
                            <CarrotRouters />
                        </Content>
                        <MCFooter />
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(App);

