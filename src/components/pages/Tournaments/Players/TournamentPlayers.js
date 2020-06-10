import React, { Component } from 'react';
import { Switch, withRouter } from 'react-router-dom';

export default withRouter(class Players extends Component {
    
    render() {

        return (
            <Switch>
                {/* <Route path={path + '/:idPlayer'} component={PlayerIndex} /> */}
                {/* <Route path={path} component={PlayerSearch} /> */}
            </Switch>
        )
    }
})