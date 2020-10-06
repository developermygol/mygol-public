import React, { Component, Fragment } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Provider as ProviderMobx } from 'mobx-react';

import Root from './components/common/Root';

import mobxStore from './store-mobx/Store';
import mobxUiStore from './store-mobx/UiStore';
import ScrollToTop from './components/common/ScrollToTop';

class App extends Component {
  state = {
    //themeCssFile: '/theme/public1.' + process.env.REACT_APP_COMMIT + '.css'
    themeCssFile:
      process.env.NODE_ENV === 'production'
        ? '/theme/public1.' + process.env.REACT_APP_COMMIT + '.css'
        : '/theme/public1.css',
  };

  render() {
    return (
      <ProviderMobx store={mobxStore} ui={mobxUiStore}>
        <Fragment>
          <link rel="stylesheet" type="text/css" href={this.state.themeCssFile} />
          {/* <BrowserRouter basename="/my-app"> */}
          <BrowserRouter>
            <ScrollToTop>
              <Route component={Root} />
            </ScrollToTop>
          </BrowserRouter>
        </Fragment>
      </ProviderMobx>
    );
  }
}

export default App;
