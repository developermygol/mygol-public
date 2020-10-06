import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './NavBarRoutes';
import Player from '../pages/Players/Details';
import ContentDetails from '../pages/Content/ContentDetails';
import ContentIndex from '../pages/Content/ContentIndex';

class Content extends Component {
  render = () => {
    return (
      <div className="ContentFrame">
        <div className="Content">
          <Switch>
            <Route path="/players/:idPlayer" component={Player} />
            <Route path="/content/section/:idCategory" component={ContentIndex} />
            <Route path="/content/:idArticle" component={ContentDetails} />

            {routes.map(item => (
              <Route
                key={item.route || ' '}
                exact={item.exact}
                path={item.route}
                component={item.component}
              />
            ))}
          </Switch>
        </div>
        {/* <SponsorBanner className='Side' position={4} organization /> */}
      </div>
    );
  };
}

export default Content;
