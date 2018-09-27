import React, { Component } from 'react';
import { getUserProfile } from '../../../controllers/auth';
import { Avatar, Tabs } from 'antd';
import { formatDate, getAvatarColor } from '../../../libs/Helpers';
import LoadingIndicator from '../../common/Loader';
import './Profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoading: false
        }
        this.loadUserProfile = this.loadUserProfile.bind(this);
    }

    loadUserProfile() {
        this.setState({
            isLoading: true
        });

        getUserProfile()
            .then(response => {
                console.log(response);
                this.setState({
                    user: response,
                    isLoading: false
                });
            }).catch(error => {
                if (error.status === 404) {
                    this.setState({
                        notFound: true,
                        isLoading: false
                    });
                } else {
                    this.setState({
                        serverError: true,
                        isLoading: false
                    });
                }
            });
    }

    componentDidMount() {
        // const username = this.props.match.params.username;
        this.loadUserProfile();
    }

    componentWillReceiveProps(nextProps) {
        // if (this.props.match.params.username !== nextProps.match.params.username) {
        //     this.loadUserProfile(nextProps.match.params.username);
        // }
    }

    render() {
        if (this.state.isLoading) {
            return <LoadingIndicator />;
        }

        return (
            <div className="profile">
                {
                    this.state.user ? (
                        <div className="user-profile">
                            <div className="user-details">
                                <div className="user-avatar">
                                    <Avatar className="user-avatar-circle" style={{ backgroundColor: getAvatarColor(this.state.user.name) }}>
                                        {this.state.user.name[0].toUpperCase()}
                                    </Avatar>
                                </div>
                                <div className="user-summary">
                                    <div className="full-name">{this.state.user.name}</div>
                                    <div className="username">@{this.state.user.username}</div>
                                    <div className="user-joined">
                                        Joined {formatDate(this.state.user.joinedAt)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null
                }
            </div>
        );
    }
}

export default Profile;