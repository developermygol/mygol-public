import React, { Fragment, useEffect, useState } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Provider as ProviderMobx } from 'mobx-react';
import { ThemeProvider } from 'styled-components';

import Root from './components/common/Root';
import mobxStore from './store-mobx/Store';

import mobxUiStore from './store-mobx/UiStore';
import ScrollToTop from './components/common/ScrollToTop';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import GlobalStyles from './GlobalStyles';
import { useSelector } from 'react-redux';

const App = () => {
  const themeCssFile =
    process.env.NODE_ENV === 'production'
      ? '/theme/public1.' + process.env.REACT_APP_COMMIT + '.css'
      : '/theme/public1.css';

  const { themeOrganization, themeTournament } = useSelector(state => state.theme);
  const [theme, setTheme] = useState({});

  useEffect(() => {
    if (themeOrganization || themeTournament) {
      if (themeTournament) setTheme(themeTournament);
      else if (themeOrganization) setTheme(themeOrganization);
    }
  }, [themeOrganization, themeTournament]);

  return (
    <ProviderMobx store={mobxStore} ui={mobxUiStore}>
      <ThemeProvider theme={theme}>
        <Fragment>
          <GlobalStyles />
          <link rel="stylesheet" type="text/css" href={themeCssFile} />
          {/* <BrowserRouter basename="/my-app"> */}
          <BrowserRouter>
            <ScrollToTop>
              <Route component={Root} />
            </ScrollToTop>
          </BrowserRouter>
        </Fragment>
      </ThemeProvider>
    </ProviderMobx>
  );
};

export default App;
