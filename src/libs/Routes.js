import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// Page 404
import Page404 from '../views/Page404/Page404';

//SharingLevels Components Pages
import Dashboard from '../views/Site/Dashboard';

import ProfilePage from '../views/user/profile/Profile';

//SharingLevels Components Pages
import SharingLevelPage from '../views/SharingLevels/Page';

//Sharing Type Components Pages
import SharingTypePage from '../views/SharingType/Page';

//Role Components Pages
import RolePage from '../views/Role/Page';

//Barn Components Pages
import BarnPage from '../views/Barns/Page';

//Manager Rewards Components Pages
import ManagerRewardsPage from '../views/ManagerRewards/Page';

//Stockist Rewards Components Pages
import StockistRewardsPage from '../views/StockistRewards/Page';

//Bazaar Items Components Pages
import BazaarItemsPage from '../views/BazaarItems/Page';

export default class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/home' component={Dashboard} />
                    <Route exact path='/profile' component={ProfilePage} />
                    <Route exact path='/sharing-levels' component={SharingLevelPage} />
                    <Route exact path='/sharing-types' component={SharingTypePage} />
                    <Route exact path='/roles' component={RolePage} />
                    <Route exact path='/barns' component={BarnPage} />
                    <Route exact path='/manager-rewards' component={ManagerRewardsPage} />
                    <Route exact path='/stockist-rewards' component={StockistRewardsPage} />
                    <Route exact path='/bazaar-items' component={BazaarItemsPage} />
                    <Route component={Page404} />
                </Switch>
            </div>
        );
    }
}